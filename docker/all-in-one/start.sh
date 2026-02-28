#!/bin/bash
set -e

echo "Starting Giteria All-in-One..."

export GITEA_APP_INI=/data/giteria/conf/app.ini
export GITEA_CUSTOM=/data/giteria

# Initialize Giteria configuration if not exists
if [ ! -f "$GITEA_APP_INI" ]; then
    echo "Initializing Giteria configuration..."
    mkdir -p /data/giteria/conf
    mkdir -p /data/git
    
    # Create app.ini from template with environment variables
    sed -e "s/\$APP_NAME/${APP_NAME:-Giteria}/" \
        -e "s/\$RUN_MODE/${RUN_MODE:-prod}/" \
        -e "s/\$DOMAIN/${DOMAIN:-localhost}/" \
        -e "s/\$SSH_DOMAIN/${SSH_DOMAIN:-localhost}/" \
        -e "s/\$HTTP_PORT/${HTTP_PORT:-3000}/" \
        -e "s|\$ROOT_URL|${ROOT_URL:-http://localhost:80}|" \
        -e "s/\$DISABLE_SSH/${DISABLE_SSH:-false}/" \
        -e "s/\$SSH_PORT/${SSH_PORT:-22}/" \
        -e "s/\$SSH_LISTEN_PORT/${SSH_LISTEN_PORT:-22}/" \
        -e "s/\$LFS_START_SERVER/${LFS_START_SERVER:-true}/" \
        -e "s/\$DB_TYPE/${DB_TYPE:-sqlite3}/" \
        -e "s|\$DB_HOST|${DB_HOST:-localhost}|" \
        -e "s/\$DB_NAME/${DB_NAME:-giteria}/" \
        -e "s/\$DB_USER/${DB_USER:-root}/" \
        -e "s|\$DB_PASSWD|${DB_PASSWD:-}|" \
        -e "s/\$INSTALL_LOCK/${INSTALL_LOCK:-true}/" \
        -e "s|\$SECRET_KEY|${SECRET_KEY:-}|" \
        -e "s/\$DISABLE_REGISTRATION/${DISABLE_REGISTRATION:-false}/" \
        -e "s/\$REQUIRE_SIGNIN_VIEW/${REQUIRE_SIGNIN_VIEW:-false}/" \
        /tmp/local/etc/templates/app.ini > "$GITEA_APP_INI"
fi

# Generate secret key if not exist
if ! grep -q "SECRET_KEY.*[a-zA-Z0-9]" "$GITEA_APP_INI" 2>/dev/null; then
    echo "Generating secret key..."
    SECRET_KEY=$(openssl rand -hex 32)
    sed -i "s|SECRET_KEY = .*|SECRET_KEY = $SECRET_KEY|" "$GITEA_APP_INI"
fi

# Create necessary directories
mkdir -p /data/git/repositories
mkdir -p /data/giteria/{tmp,/uploads,sessions,indexers,avatars,repo-avatars,attachments,log}

# Fix permissions
chown -R git:git /data/git /data/giteria

# Start nginx in background
echo "Starting nginx..."
nginx -c /etc/nginx/nginx.conf

# Start Giteria backend (runs as git user)
echo "Starting Giteria backend on port 3000..."
su-exec git /usr/local/bin/giteria web &

# Wait for backend to be ready
sleep 3

# Start Next.js frontend
echo "Starting Next.js frontend on port 3001..."
cd /app/frontend
su-exec nextjs node server.js &

# Wait for all background processes
echo "All services started!"
wait
