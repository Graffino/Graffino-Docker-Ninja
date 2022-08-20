include .env
export

CONTAINER_NGINX=docker compose exec -T nginx sh -c
CONTAINER_PHP=docker compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker compose exec -T mariadb sh -c

.PHONY: start
start:
	docker compose up -d

.PHONY: stop
stop:
	docker compose -f docker-compose.yml down

.PHONY: setup
setup:
	make permissions
	docker network create proxy || true
	docker compose up --build -d
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:uploads:symlink --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:languages:symlink --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build'
	$(CONTAINER_PHP) 'php composer/vendor/interconnectit/search-replace-db/srdb.cli.php -h mariadb -n ${DB_NAME} -u root -p "${DB_PASSWORD}" -s "$(DB_REPLACE)" -r "$(DOCKER_HOSTNAME)"'

.PHONY: staging
staging:
	make production

.PHONY: staging-test
staging-test:
	make production
	$(CONTAINER_PHP) 'yarn lint'

.PHONY: production
production:
	make permissions
	docker compose up -d
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:uploads:symlink --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:uploads:languages --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build'
	$(CONTAINER_PHP) 'php composer/vendor/interconnectit/search-replace-db/srdb.cli.php -h mariadb -n ${DOCKER_DB_NAME} -u root -p "${DOCKER_DB_PASSWORD}" -s "$(DB_REPLACE)" -r "$(DOCKER_HOSTNAME)"'

.PHONY: composer
composer:
	$(CONTAINER_PHP) 'composer install'

.PHONY: fix
fix:
	$(CONTAINER_PHP) 'yarn fix'

.PHONY: test
test:
	$(CONTAINER_PHP) 'yarn lint'

.PHONY: permissions
permissions:
	mkdir -p .docker/logs/cron/ .docker/logs/nginx/ .docker/logs/mariadb .docker/logs/php-fpm/ || true
	chmod -R 777 .docker/logs/ || true

.PHONY: reset
reset:
	$(CONTAINER_MARIADB) 'rm -rf /var/log/mysql/* || true'
	$(CONTAINER_NGINX) 'rm -rf /var/log/nginx/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/log/cron/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/log/php-fpm/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/node_modules/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/dist-wp/ || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/.cache/ || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/composer/ || true'
	docker compose -f docker-compose.yml down
	docker system prune --force
	rm -rf ./.docker/logs/mariadb/* || true
	rm -rf ./.docker/logs/nginx/* || true
	rm -rf ./.docker/logs/cron/* || true
	rm -rf ./.docker/logs/php-fpm/* || true
	rm -rf ./node_modules/ || true
	rm -rf ./dist-wp/ || true
	rm -rf ./composer/ || true
	rm -rf ./.cache/ || true
	make setup

.PHONY: clean
clean:
	$(CONTAINER_MARIADB) 'rm -rf /var/log/mysql/* || true'
	$(CONTAINER_NGINX) 'rm -rf /var/log/nginx/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/log/cron/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/log/php-fpm/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/node_modules/* || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/dist-wp/ || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/.cache/ || true'
	$(CONTAINER_PHP) 'rm -rf /var/www/composer/ || true'
	docker compose -f docker-compose.yml down
	docker system prune --all --volumes --force
	rm -rf ./.docker/logs/mariadb/* || true
	rm -rf ./.docker/logs/nginx/* || true
	rm -rf ./.docker/logs/cron/* || true
	rm -rf ./.docker/logs/php-fpm/* || true
	rm -rf ./node_modules/ || true
	rm -rf ./dist-wp/ || true
	rm -rf ./composer/ || true
	rm -rf ./.cache/ || true

.PHONY: clean-force
clean-force:
	sudo make clean

.PHONY: ssh-nginx
ssh-nginx:
	docker exec -it ${COMPOSE_PROJECT_NAME}-nginx /bin/sh

.PHONY: ssh-php
ssh-php:
	docker exec -it ${COMPOSE_PROJECT_NAME}-php-fpm /bin/sh

.PHONY: ssh-mariadb
ssh-mariadb:
	docker exec -it ${COMPOSE_PROJECT_NAME}-mariadb /bin/sh

.PHONY: rebuild-nginx
rebuild-nginx:
	docker compose up -d --no-deps  --force-recreate --build nginx

.PHONY: rebuild-php
rebuild-php:
	docker compose up -d --no-deps  --force-recreate --build php-fpm

.PHONY: rebuild-mariadb
rebuild-mariadb:
	docker compose up -d --no-deps  --force-recreate --build mariadb

