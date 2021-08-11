include .env
export

CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c

.PHONY: start
start:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose -f docker-compose.yml down

.PHONY: setup
setup:
	make permissions
	docker network create proxy || true
	docker-compose up --build -d
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn composer:update'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:symlink:uploads --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build'

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
	docker-compose up -d
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn composer:update'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:symlink:uploads --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build'

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
	mkdir -p .docker/logs/cron/ .docker/logs/nginx/ .docker/logs/mariadb docker/logs/php-fpm/
	chmod -R 777 .docker/logs/

.PHONY: reset
reset:
	docker-compose -f docker-compose.yml down
	docker system prune --force
	rm -rf ./.docker/logs/cron/*
	rm -rf ./.docker/logs/mariadb/*
	rm -rf ./.docker/logs/nginx/*
	rm -rf ./.docker/logs/php-fpm/*
	rm -rf ./node_modules/
	rm -rf ./.cache/
	rm -rf ./composer/
	rm -rf ./vendor/
	rm -rf ./dist-wp/
	rm -rf ./dist/
	make setup

.PHONY: clean
clean:
	docker-compose -f docker-compose.yml down
	docker system prune --all --volumes --force
	rm -rf ./.docker/logs/cron/*
	rm -rf ./.docker/logs/mariadb/*
	rm -rf ./.docker/logs/nginx/*
	rm -rf ./.docker/logs/php-fpm/*
	rm -rf ./node_modules/
	rm -rf ./.cache/
	rm -rf ./composer/
	rm -rf ./vendor/
	rm -rf ./dist-wp/
	rm -rf ./dist/

.PHONY: clean-force
clean-force:
	sudo make clean

.PHONY: ssh-nginx
ssh-nginx:
	docker exec -it ${COMPOSE_PROJECT_NAME}_nginx_1 /bin/sh

.PHONY: ssh-php
ssh-php:
	docker exec -it ${COMPOSE_PROJECT_NAME}_php-fpm_1 /bin/sh

.PHONY: ssh-mariadb
ssh-mariadb:
	docker exec -it ${COMPOSE_PROJECT_NAME}_mariadb_1 /bin/sh

.PHONY: rebuild-nginx
rebuild-nginx:
	docker-compose up -d --no-deps  --force-recreate --build nginx

.PHONY: rebuild-php
rebuild-php:
	docker-compose up -d --no-deps  --force-recreate --build php-fpm

.PHONY: rebuild-mariadb
rebuild-mariadb:
	docker-compose up -d --no-deps  --force-recreate --build mariadb

