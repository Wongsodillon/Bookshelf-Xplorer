#!/usr/bin/env bash
set -e

ensure_path() {
  mkdir -p "$1"
  if [ "$(id -u)" -eq 0 ]; then
    if ! chown -R www-data:www-data "$1" 2>/tmp/chown.err; then
      echo "WARNING: Could not change ownership of $1: $(cat /tmp/chown.err)"
    fi
    if ! chmod -R 775 "$1" 2>/tmp/chmod.err; then
      echo "WARNING: Could not change permissions for $1: $(cat /tmp/chmod.err)"
    fi
  fi
}

ensure_path /var/www/html/storage/app/public
ensure_path /var/www/html/storage/framework/cache
ensure_path /var/www/html/storage/framework/views
ensure_path /var/www/html/storage/framework/sessions
ensure_path /var/www/html/bootstrap/cache

if [ ! -L /var/www/html/public/storage ]; then
  php artisan storage:link || true
fi

if [ -z "$APP_KEY" ]; then
  echo "WARNING: APP_KEY is not set. Generate one before going to production."
fi

exec "$@"
