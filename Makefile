CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c

dev start:
	docker-compose up -d
	$(CONTAINER_PHP) "yarn wp --no-progress"

stop:
	docker-compose stop

build:
	docker-compose up -d
	$(CONTAINER_PHP) "yarn wp:setup"
	$(CONTAINER_PHP) "yarn wp:update"
	$(CONTAINER_PHP) "yarn wp:clean --no-confirm"
	$(CONTAINER_PHP) "yarn wp:db:init --no-confirm"
	$(CONTAINER_PHP) "yarn wp:db:migrate --no-confirm"
	$(CONTAINER_PHP) "yarn wp:sync:uploads --no-confirm"
	$(CONTAINER_PHP) "yarn webpack:wp:build --no-progress"

setup:
	docker-compose up --build -d

reset:
	docker-compose -f docker-compose.yml down
	docker rm -f $(docker ps -a -q)
	docker volume rm $(docker volume ls -q)
	docker-compose up --build -d

delete:
	docker-compose -f docker-compose.yml down
	docker image prune --all --force
	docker system prune --volumes

clean:
	$(CONTAINER_PHP) "yarn clean:all --no-confirm"
