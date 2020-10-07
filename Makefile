CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c

start:
	docker-compose up -d
	$(CONTAINER_PHP) "yarn wp"

stop:
	docker-compose stop

build:
	docker-compose up -d
	$(CONTAINER_PHP) "yarn webpack:wp:build"

setup:
	docker-compose stop
	docker-compose up --build -d
	$(CONTAINER_PHP) "yarn wp:setup"
	$(CONTAINER_PHP) "yarn wp:update"
	$(CONTAINER_PHP) "yarn wp:clean --no-confirm"
	$(CONTAINER_PHP) "yarn wp:db:init --no-confirm"
	$(CONTAINER_PHP) "yarn wp:db:migrate --no-confirm"
	$(CONTAINER_PHP) "yarn wp:sync:uploads --no-confirm"
	$(CONTAINER_PHP) "yarn webpack:wp:build"

reset:
	docker-compose -f docker-compose.yml down
	docker image prune --all --force

erase:
	docker-compose -f docker-compose.yml down
	docker system prune --volumes

clean:
	yarn clean:all --no-confirm

