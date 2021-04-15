include .env
export

CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c

start:
	docker-compose up -d

stop:
	docker-compose -f docker-compose.yml down

setup:
	make permissions
	docker-compose up --build -d
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn composer:update'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:sync:uploads --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build'

staging:
	make production

staging-test:
	make production
	$(CONTAINER_PHP) 'yarn lint'

production:
	make permissions
	docker-compose up -d
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn composer:update'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:sync:uploads --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build'

composer:
	$(CONTAINER_PHP) "composer install"

fix:
	$(CONTAINER_PHP) "yarn fix"

test:
	$(CONTAINER_PHP) 'yarn lint'

permissions:
	chmod -R 777 .docker/logs/

reset:
	docker-compose -f docker-compose.yml down
	docker system prune --force
	rm -rf ./.docker/logs/*
	rm -rf ./node_modules/
	rm -rf ./vendor/
	rm -rf ./.cache/
	rm -rf ./dist-wp/
	rm -rf ./dist/
	make setup

clean:
	docker-compose -f docker-compose.yml down
	docker system prune --all --volumes --force
	rm -rf ./.docker/logs/*
	rm -rf ./node_modules/
	rm -rf ./.cache/
	rm -rf ./vendor/
	rm -rf ./dist-wp/
	rm -rf ./dist/

clean-force:
	sudo make clean

ssh-nginx:
	docker exec -it ${COMPOSE_PROJECT_NAME}_nginx_1 /bin/sh

ssh-php:
	docker exec -it ${COMPOSE_PROJECT_NAME}_php-fpm_1 /bin/sh

ssh-mariadb:
	docker exec -it ${COMPOSE_PROJECT_NAME}_mariadb_1 /bin/sh

rebuild-nginx:
	docker-compose up -d --no-deps  --force-recreate --build nginx

rebuild-php:
	docker-compose up -d --no-deps  --force-recreate --build php-fpm

rebuild-mariadb:
	docker-compose up -d --no-deps  --force-recreate --build mariadb

