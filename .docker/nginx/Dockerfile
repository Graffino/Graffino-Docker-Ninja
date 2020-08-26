FROM nginx:stable-alpine

RUN mkdir -p /var/log/nginx/ && \
    chown -R nginx:nginx /var/log/nginx

# NodeJS
RUN apk add --no-cache nodejs yarn --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community"

EXPOSE 80

WORKDIR /var/www

CMD ["nginx", "-g", "daemon off;"]