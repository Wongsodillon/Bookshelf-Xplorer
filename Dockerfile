# -------------------------
# Frontend build (Vite)
# -------------------------
FROM node:20 AS frontend
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# -------------------------
# Composer dependencies
# -------------------------
FROM php:8.2-cli AS vendor
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libzip-dev zlib1g-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader

# -------------------------
# Production PHP image
# -------------------------
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libpng-dev libonig-dev libxml2-dev libzip-dev zlib1g-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=vendor /usr/bin/composer /usr/bin/composer
COPY --from=vendor /app/vendor ./vendor
COPY --from=vendor /app/composer.json /app/composer.lock ./
COPY . .
COPY --from=frontend /app/public/build ./public/build

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000

USER www-data

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]
