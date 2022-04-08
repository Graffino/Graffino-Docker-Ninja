FROM php:8.0-fpm-alpine

ENV DOCKER_PHP_XDEBUG_MODE=${DOCKER_PHP_XDEBUG_MODE:-"off"}
ENV DOCKER_PHP_ERRORS=${DOCKER_PHP_ERRORS:-"off"}

ARG DOCKER_PHP_EXTENSIONS
ENV DOCKER_PHP_EXTENSIONS=${DOCKER_PHP_EXTENSIONS:-"gd mysqli bcmath pdo_mysql zip xdebug"}
ENV DOCKER_PHP_UPLOAD_SIZE=${DOCKER_PHP_UPLOAD_SIZE:-"32M"}

ARG DOCKER_COMPOSER_GIT_TOKEN
ENV DOCKER_COMPOSER_GIT_TOKEN=${DOCKER_COMPOSER_GIT_TOKEN:-""}

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
    install-php-extensions $(eval echo ${DOCKER_PHP_EXTENSIONS})

# Development Tools
RUN apk add gcc make g++ zlib-dev autoconf automake libtool nasm libjpeg jpeg-dev libjpeg-turbo-dev

# Install Python
RUN apk add python3 py3-pip

# Fix for OptiPNG on ARM64
ENV CPPFLAGS="-DPNG_ARM_NEON_OPT=0"

# Git
RUN apk add git

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add Oauth Token for Composer
RUN composer config -g github-oauth.github.com ${DOCKER_COMPOSER_GIT_TOKEN}

# Install MariaDB Client
RUN apk add mariadb-client

# NodeJS
RUN apk add nodejs npm
# Yarn
RUN apk add yarn --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community"

# WP CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN mv wp-cli.phar /usr/local/bin/wpp
RUN printf "#!/bin/sh\n/usr/local/bin/wpp --path='./dist-wp/' --allow-root \"\$@\"" > wp
RUN chmod +x wp
RUN mv wp /usr/local/bin/


RUN apk add vim
RUN apk add mc

# Cron
ENV TZ=Europe/Bucharest
RUN apk add busybox-initscripts

# Copy MariaDB configuration
COPY ./.docker/php/cron/crontab /tmp/crontab
RUN mkdir /var/log/cron
RUN touch /var/log/cron/cron.log
RUN crontab /tmp/crontab


WORKDIR /var/www/

VOLUME /var/www/node_modules

EXPOSE ${DOCKER_PHP_PORT}

CMD ["php-fpm"]
