CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c
CONTAINER_WORKER=docker-compose exec -T worker sh -c

start:
	docker-compose up -d
	$(CONTAINER_WORKER) "yarn wp"

stop:
	docker-compose stop

build:
	docker-compose up -d
	$(CONTAINER_WORKER) "yarn webpack:wp:build"

setup:
	docker-compose stop
	docker-compose up --build -d
	$(CONTAINER_WORKER) "yarn wp:setup"
	$(CONTAINER_WORKER) "yarn wp:update"
	$(CONTAINER_WORKER) "yarn wp:clean --no-confirm"
	$(CONTAINER_WORKER) "yarn wp:db:init --no-confirm"
	$(CONTAINER_WORKER) "yarn wp:db:migrate --no-confirm"
	$(CONTAINER_WORKER) "yarn wp:sync:uploads --no-confirm"
	$(CONTAINER_WORKER) "yarn webpack:wp:build"

reset:
	yarn clean:all
	docker-compose -f docker-compose.yml down
	docker image prune --all --force

erase:
	yarn clean:all
	docker-compose -f docker-compose.yml down
	docker system prune --volumes

