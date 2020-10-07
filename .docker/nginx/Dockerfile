FROM nginx:stable-alpine

RUN mkdir -p /var/log/nginx/ && \
    chown -R nginx:nginx /var/log/nginx

EXPOSE 80

WORKDIR /var/www/dist-wp

CMD ["nginx", "-g", "daemon off;"]
