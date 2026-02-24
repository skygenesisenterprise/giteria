#!/bin/sh

set -e

if [ ! -f ./build/test-env-check.sh ]; then
  echo "${0} can only be executed in giteria source root directory"
  exit 1
fi


echo "check uid ..."

# the uid of giteria defined in "https://giteria.com/giteria/test-env" is 1000
giteria_uid=$(id -u giteria)
if [ "$giteria_uid" != "1000" ]; then
  echo "The uid of linux user 'giteria' is expected to be 1000, but it is $giteria_uid"
  exit 1
fi

cur_uid=$(id -u)
if [ "$cur_uid" != "0" -a "$cur_uid" != "$giteria_uid" ]; then
  echo "The uid of current linux user is expected to be 0 or $giteria_uid, but it is $cur_uid"
  exit 1
fi
