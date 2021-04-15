# Docker

## Notice

* Do not change the `.env.example` files without checking if the deployment still works.

## Setup

As a global requirement you need to have Traefik running on the "proxy" external network.

### Evironment configuration

Create your `.env` from `.env.example`.

## 2. Docker

### Make Commands

You need to run commands via make in order for them to run in the Docker container.

1. `make start | make stop` - Starts / stops the Docker environment.
2. `make setup` - Setups (build & update) and configures everything automatically, resets and seeds the database and generates docs.
3. `make production` - Deploys (update) environment for production.
4. `make staging` - Deploys (update) environment for staging.
5. `make staging-test` - Deploys (update) environment for tests and runs tests.
6. `make composer` - Builds composer packages.
7. `make seed` - Makes a fresh seed.
8. `make fix` - Runs autofixers errors.
9. `make test` - Runs the linters and tests.
10. `make reset` - Deletes all stopped containers and images in this project, and rebuilds everything.
11. `make clean` - Deletes all stopped containers in this project, volumes and images and build cache in Docker (Nuclear Option).
12. `make clean-force` Use `sudo` to `make clean`.

### Run custom command in a container

SSH into the container and run your `php artisan` or `mysql` comand

1. `make ssh-nginx` - SSH into the nginx container
2. `make ssh-php` - SSH into the PHP container
3. `make ssh-mariadb` - SSH into the MariaDB container.

### Docker configuration

1. You can run your Docker on a different port change other settings via `.docker.env` create your own from `.docker.env.example`. Traefik will handle everything for you so this isn't required.
2. To connect to the database via NaviCat use the Docker MariaDB port. The default one is `8306`.

### Docker logs

* Logs are available for all services in the `.docker/logs` folder.

### Docker rebuild individual cointainers

1. `make rebuild-nginx` - Rebuild nginx container.
2. `make rebuild-php` - Rebuild PHP container.
3. `make rebuild-mariadb` - Rebuild MariaDB container.
