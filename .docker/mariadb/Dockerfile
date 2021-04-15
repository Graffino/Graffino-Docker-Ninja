FROM alpine:latest

ENV DOCKER_DB_HOST=${DOCKER_DB_HOST:-127.0.0.1}
ENV DOCKER_DB_PORT=${DOCKER_DB_PORT:-3306}
ENV DOCKER_DB_PASSWORD=${DOCKER_DB_PASSWORD:-"admin"}
ENV DOCKER_DB_NAME=${DOCKER_DB_NAME:-""}
ENV DOCKER_DB_USER=${DOCKER_DB_USER:-""}
ENV DOCKER_DB_PASSWORD=${DOCKER_DB_PASSWORD:-""}
ENV DOCKER_DB_ROOT_PASSWORD=${DOCKER_DB_ROOT_PASSWORD:-""}

RUN apk add --update --no-cache mariadb mariadb-client mariadb-server-utils pwgen && \
    rm -f /var/cache/apk/*

ADD ./.docker/mariadb/scripts/run.sh /scripts/run.sh
RUN mkdir /docker-entrypoint-initdb.d && \
    mkdir /scripts/pre-exec.d && \
    mkdir /scripts/pre-init.d && \
    chmod -R 755 /scripts

RUN mkdir -p /var/log/mysql/ && \
    chown -R mysql:mysql /var/log/mysql

RUN apk add vim
RUN apk add mc

# Copy MariaDB configuration
COPY ./.docker/mariadb/my.cnf.d/server.cnf /etc/my.cnf.d/mariadb-server.cnf

EXPOSE ${DOCKER_DB_PORT}

VOLUME ["/var/lib/mysql"]

ENTRYPOINT ["/scripts/run.sh"]
