FROM nginx:stable-alpine

RUN mkdir -p /var/log/nginx/ && \
    chown -R nginx:nginx /var/log/nginx

RUN apk add vim
RUN apk add mc

EXPOSE ${DOCKER_NGINX_PORT}

WORKDIR /var/www/public

CMD ["nginx", "-g", "daemon off;"]
