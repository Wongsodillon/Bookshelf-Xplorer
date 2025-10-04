#!/usr/bin/env bash
set -e

# this file runs as USER www-data; if you need to run root-only tasks,
# handle those in the Dockerfile or run docker compose exec as root.
# Ensure storage and cache dirs exist
php artisan storage:link || true

# ensure perms (some CI artifacts might have different owners)
chown -R www-data:www-data storage bootstrap/cache || true

# If APP_KEY is missing, print a warning (don't auto-generate in prod)
if [ -z "$APP_KEY" ]; then
  echo "WARNING: APP_KEY is not set. Generate one before going to production."
fi

exec "$@"