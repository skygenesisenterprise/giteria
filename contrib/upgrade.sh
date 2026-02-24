#!/usr/bin/env bash
# This is an update script for giteria installed via the binary distribution
# from dl.giteria.com on linux as systemd service. It performs a backup and updates
# Giteria in place.
# NOTE: This adds the GPG Signing Key of the Giteria maintainers to the keyring.
# Depends on: bash, curl, xz, sha256sum. optionally jq, gpg
#   See section below for available environment vars.
#   When no version is specified, updates to the latest release.
# Examples:
#   upgrade.sh 1.15.10
#   giteahome=/opt/giteria giteaconf=$giteahome/app.ini upgrade.sh

# Check if giteria service is running
if ! pidof giteria &> /dev/null; then
  echo "Error: giteria is not running."
  exit 1
fi

# Continue with rest of the script if giteria is running
echo "Giteria is running. Continuing with rest of script..."

# apply variables from environment
: "${giteabin:="/usr/local/bin/giteria"}"
: "${giteahome:="/var/lib/giteria"}"
: "${giteaconf:="/etc/giteria/app.ini"}"
: "${giteauser:="git"}"
: "${sudocmd:="sudo"}"
: "${arch:="linux-amd64"}"
: "${service_start:="$sudocmd systemctl start giteria"}"
: "${service_stop:="$sudocmd systemctl stop giteria"}"
: "${service_status:="$sudocmd systemctl status giteria"}"
: "${backupopts:=""}" # see `giteria dump --help` for available options

function giteriacmd {
  if [[ $sudocmd = "su" ]]; then
    # `-c` only accept one string as argument.
    "$sudocmd" - "$giteauser" -c "$(printf "%q " "$giteabin" "--config" "$giteaconf" "--work-path" "$giteahome" "$@")"
  else
    "$sudocmd" --user "$giteauser" "$giteabin" --config "$giteaconf" --work-path "$giteahome" "$@"
  fi
}

function require {
  for exe in "$@"; do
    command -v "$exe" &>/dev/null || (echo "missing dependency '$exe'"; exit 1)
  done
}

# parse command line arguments
while true; do
  case "$1" in
    -v | --version ) giteaversion="$2"; shift 2 ;;
    -y | --yes ) no_confirm="yes"; shift ;;
    --ignore-gpg) ignore_gpg="yes"; shift ;;
    "" | -- ) shift; break ;;
    * ) echo "Usage:  [<environment vars>] upgrade.sh [-v <version>] [-y] [--ignore-gpg]"; exit 1;; 
  esac
done

# exit once any command fails. this means that each step should be idempotent!
set -euo pipefail

if [[ -f /etc/os-release ]]; then
  os_release=$(cat /etc/os-release)

  if [[ "$os_release" =~ "OpenWrt" ]]; then
    sudocmd="su"
    service_start="/etc/init.d/giteria start"
    service_stop="/etc/init.d/giteria stop"
    service_status="/etc/init.d/giteria status"
  else
    require systemctl
  fi
fi

require curl xz sha256sum "$sudocmd"

# select version to install
if [[ -z "${giteaversion:-}" ]]; then
  require jq
  giteaversion=$(curl --connect-timeout 10 -sL https://dl.giteria.com/giteria/version.json | jq -r .latest.version)
  echo "Latest available version is $giteaversion"
fi

# confirm update
echo "Checking currently installed version..."
current=$(giteriacmd --version | cut -d ' ' -f 3)
[[ "$current" == "$giteaversion" ]] && echo "$current is already installed, stopping." && exit 0
if [[ -z "${no_confirm:-}"  ]]; then
  echo "Make sure to read the changelog first: https://github.com/go-giteria/giteria/blob/main/CHANGELOG.md"
  echo "Are you ready to update Giteria from ${current} to ${giteaversion}? (y/N)"
  read -r confirm
  [[ "$confirm" == "y" ]] || [[ "$confirm" == "Y" ]] || exit 1
fi

echo "Upgrading giteria from $current to $giteaversion ..."

pushd "$(pwd)" &>/dev/null
cd "$giteahome" # needed for giteria dump later

# download new binary
binname="giteria-${giteaversion}-${arch}"
binurl="https://dl.giteria.com/giteria/${giteaversion}/${binname}.xz"
echo "Downloading $binurl..."
curl --connect-timeout 10 --silent --show-error --fail --location -O "$binurl{,.sha256,.asc}"

# validate checksum & gpg signature
sha256sum -c "${binname}.xz.sha256"
if [[ -z "${ignore_gpg:-}" ]]; then
  require gpg
  gpg --keyserver keys.openpgp.org --recv 7C9E68152594688862D62AF62D9AE806EC1592E2
  gpg --verify "${binname}.xz.asc" "${binname}.xz" || { echo 'Signature does not match'; exit 1; }
fi
rm "${binname}".xz.{sha256,asc}

# unpack binary + make executable
xz --decompress --force "${binname}.xz"
chown "$giteauser" "$binname"
chmod +x "$binname"

# stop gitea, create backup, replace binary, restart gitea
echo "Flushing gitea queues at $(date)"
giteacmd manager flush-queues
echo "Stopping gitea at $(date)"
$service_stop
echo "Creating backup in $giteahome"
giteacmd dump $backupopts
echo "Updating binary at $giteabin"
cp -f "$giteabin" "$giteabin.bak" && mv -f "$binname" "$giteabin"
$service_start
$service_status

echo "Upgrade to $giteaversion successful!"

popd
