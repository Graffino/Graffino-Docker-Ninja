CONTAINER_NGINX=docker-compose exec -T nginx sh -c
CONTAINER_PHP=docker-compose exec -T php-fpm sh -c
CONTAINER_MARIADB=docker-compose exec -T mariadb sh -c

start:
	docker-compose up -d

stop:
	docker-compose stop

compile:
	$(CONTAINER_NGINX) "yarn wp"

setup:
	docker-compose stop
	docker-compose up --build -d

reset:
	docker-compose -f docker-compose.yml down
	docker image prune --all --force

erase:
	docker system prune --volumes


