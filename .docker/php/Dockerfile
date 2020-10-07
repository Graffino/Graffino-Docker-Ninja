FROM php:7.3-fpm-alpine

ENV XDEBUG_DEFAULT_ENABLE ${XDEBUG_DEFAULT_ENABLE:-1}
ENV XDEBUG_REMOTE_ENABLE ${XDEBUG_REMOTE_ENABLE:-1}
ENV XDEBUG_REMOTE_HOST ${XDEBUG_REMOTE_HOST:-"127.0.0.1"}
ENV XDEBUG_REMOTE_PORT ${XDEBUG_REMOTE_PORT:-9000}
ENV XDEBUG_REMOTE_AUTO_START ${XDEBUG_REMOTE_AUTO_START:-1}
ENV XDEBUG_REMOTE_CONNECT_BACK ${XDEBUG_REMOTE_CONNECT_BACK:-1}
ENV XDEBUG_IDEKEY ${XDEBUG_IDEKEY:-docker}
ENV XDEBUG_PROFILER_ENABLE ${XDEBUG_PROFILER_ENABLE:-0}
ENV XDEBUG_PROFILER_OUTPUT_DIR ${XDEBUG_PROFILER_OUTPUT_DIR:-"/tmp"}

ENV OPCACHE_VALIDATE_TIMESTAMPS ${OPCACHE_VALIDATE_TIMESTAMPS:-0}
ENV OPCACHE_MAX_ACCELERATED_FILES ${OPCACHE_MAX_ACCELERATED_FILES:-10000}
ENV OPCACHE_MEMORY_CONSUMPTION ${OPCACHE_MEMORY_CONSUMPTION:-192}
ENV OPCACHE_MAX_WASTED_PERCENTAGE ${OPCACHE_MAX_WASTED_PERCENTAGE:-10}

ENV PHP_EXTENSIONS ${PHP_EXTENSIONS:-"zip xdebug"}

ENV COMPOSER_ALLOW_SUPERUSER 1

# Copy PHP configuration
COPY .docker/php/conf.d/php.ini /usr/local/etc/php/php.ini
COPY .docker/php/php-fpm.d/www.conf /usr/local/etc/php-fpm.d

# Copy extension configurations
COPY .docker/php/conf.d/xdebug.ini /usr/local/etc/php/conf.d/xdebug-dev.ini
COPY .docker/php/conf.d/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Logs
RUN mkdir -p /var/log/php-fpm/ && \
    chown -R www-data:www-data /var/log/php-fpm

# Install PHP Extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN chmod uga+x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions ${PHP_EXTENSIONS}

# Development Tools
RUN apk add gcc make g++ zlib-dev autoconf automake libtool nasm

# Git
RUN apk add git

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# NodeJS
RUN apk add nodejs npm
# Yarn
RUN apk add yarn --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community"

WORKDIR /var/www/

EXPOSE 9001

CMD ["php-fpm"]
