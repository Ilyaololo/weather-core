FROM nginx:1.15-alpine

COPY nginx.conf /tmp/

# RUN rm -rf /usr/share/nginx/html/*

CMD /bin/sh -c "envsubst '\$APP_PORT' < /tmp/nginx.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
