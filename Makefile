CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c

dev start:
	docker-compose up -d
	$(CONTAINER_PHP) "yarn wp --no-progress"

stop:
	docker-compose stop

build:
	$(CONTAINER_PHP) 'yarn node:install'
	$(CONTAINER_PHP) 'yarn composer:install'
	$(CONTAINER_PHP) 'yarn composer:update'
	$(CONTAINER_PHP) 'yarn wp:clean --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:init --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:db:migrate --no-confirm'
	$(CONTAINER_PHP) 'yarn wp:sync:uploads --no-confirm'
	$(CONTAINER_PHP) 'yarn webpack:wp:build --no-progress'

setup:
	docker-compose up --build -d

clean:
	$(CONTAINER_PHP) 'yarn clean:all --no-confirm'

reset:
	docker-compose -f docker-compose.yml down
	docker system prune --all --force
	make setup

delete:
	docker-compose -f docker-compose.yml down
	docker system prune --all --volumes --force

