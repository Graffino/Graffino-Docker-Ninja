FROM alpine:latest

ENV MYSQL_ADDRESS ${MYSQL_ADDRESS:-127.0.0.1}
ENV MYSQL_PORT ${MYSQL_PORT:-3306}
ENV MYSQL_ROOT_PASSWORD ${DB_PASSWORD:-""}
ENV MYSQL_DATABASE ${DB_NAME:-""}
ENV MYSQL_USER ${DB_USER:-""}
ENV MYSQL_PASSWORD ${DB_PASSWORD:-""}

RUN apk add --update --no-cache mariadb mariadb-client mariadb-server-utils pwgen && \
    rm -f /var/cache/apk/*

ADD ./.docker/mariadb/scripts/run.sh /scripts/run.sh
RUN mkdir /docker-entrypoint-initdb.d && \
    mkdir /scripts/pre-exec.d && \
    mkdir /scripts/pre-init.d && \
    chmod -R 755 /scripts

RUN mkdir -p /var/log/mysql/ && \
    chown -R mysql:mysql /var/log/mysql

# Copy NGINX configuration
COPY ./.docker/mariadb/my.cnf.d/server.cnf /etc/my.cnf.d/mariadb-server.cnf

EXPOSE ${MYSQL_PORT}

VOLUME ["/var/lib/mysql"]

ENTRYPOINT ["/scripts/run.sh"]
