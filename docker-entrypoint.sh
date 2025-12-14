#!/usr/bin/env bash
set -e

mkdir -p /var/www/html/storage/app/public \
         /var/www/html/storage/framework/{cache,views,sessions} \
         /var/www/html/bootstrap/cache

chown_safe() {
  # Don't fail the container if mounted volumes reject ownership changes.
  # This is common in dev environments with bind mounts.
  local path="$1"
  if ! chown -R www-data:www-data "$path" 2>/tmp/chown.err; then
    echo "WARNING: Could not change ownership of $path: $(cat /tmp/chown.err)"
  fi
}

chmod_safe() {
  local mode="$1"
  local path="$2"
  if ! chmod -R "$mode" "$path" 2>/tmp/chmod.err; then
    echo "WARNING: Could not change permissions for $path: $(cat /tmp/chmod.err)"
  fi
}

chown_safe /var/www/html/storage
chown_safe /var/www/html/bootstrap/cache

chmod_safe 775 /var/www/html/storage
chmod_safe 775 /var/www/html/bootstrap/cache

if [ ! -L /var/www/html/public/storage ]; then
  echo "Creating storage symlink..."
  php artisan storage:link || true
fi

# ensure perms (some CI artifacts might have different owners)
chown_safe storage
chown_safe bootstrap/cache

# If APP_KEY is missing, print a warning (don't auto-generate in prod)
if [ -z "$APP_KEY" ]; then
  echo "WARNING: APP_KEY is not set. Generate one before going to production."
fi

exec "$@"