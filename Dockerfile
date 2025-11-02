# -------------------------
# Stage 1 — Node: build React assets
# -------------------------
FROM node:20 AS node-builder
WORKDIR /app

# copy package.json first (for caching)
COPY package*.json ./

# install deps (ci is reproducible + cleaner than install)
RUN npm ci --silent

# copy rest of Laravel app (but especially resources/js, vite.config, etc.)
COPY . .

# build assets (adjust for your build tool: vite, mix, webpack, etc.)
RUN npm run build

# -------------------------
# Stage 2 — Composer: install composer vendor (no-dev)
# -------------------------
FROM php:8.2-fpm AS composer

# install dependencies needed for composer to work
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libzip-dev zlib1g-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*

# copy composer binary from official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-scripts --no-interaction --no-progress

COPY . .
RUN composer dump-autoload --optimize

# -------------------------
# Stage 3 — PHP-FPM (final)
# -------------------------
FROM php:8.2-fpm

# install system dependencies and php extensions commonly needed by Laravel
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libpng-dev libonig-dev libxml2-dev libzip-dev zlib1g-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && rm -rf /var/lib/apt/lists/*

# Create working dir
WORKDIR /var/www/html

# copy composer-built vendor
COPY --from=composer /app/vendor /var/www/html/vendor
COPY composer.json composer.lock /var/www/html/

# copy the rest of the app
# copy the rest of the app
COPY . /var/www/html

# copy built React assets
COPY --from=node-builder /app/public/build /var/www/html/public/build

# copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ensure permissions so container can boot cleanly
RUN mkdir -p /var/www/html/storage/app/public \
    && mkdir -p /var/www/html/storage/framework/{cache,views,sessions} \
    && mkdir -p /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# expose php-fpm port for nginx to connect
EXPOSE 9000

# run as www-data (non-root)
USER www-data

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]