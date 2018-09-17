FROM keymetrics/pm2:8-alpine

WORKDIR /data

COPY ./ ./

RUN yarn install
RUN pm2 install pm2-logrotate pm2-server-monit

CMD ["pm2-runtime", "start", "pm2.config.json"]
