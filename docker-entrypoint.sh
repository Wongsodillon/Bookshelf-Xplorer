#!/usr/bin/env bash
set -e

mkdir -p /var/www/html/storage/app/public \
         /var/www/html/storage/framework/{cache,views,sessions} \
         /var/www/html/bootstrap/cache

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

if [ ! -L /var/www/html/public/storage ]; then
  echo "Creating storage symlink..."
  php artisan storage:link || true
fi

# ensure perms (some CI artifacts might have different owners)
chown -R www-data:www-data storage bootstrap/cache || true

# If APP_KEY is missing, print a warning (don't auto-generate in prod)
if [ -z "$APP_KEY" ]; then
  echo "WARNING: APP_KEY is not set. Generate one before going to production."
fi

exec "$@"