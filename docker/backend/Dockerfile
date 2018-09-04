FROM keymetrics/pm2:10-alpine

COPY pm2.config.json .

COPY package.json .
COPY yarn.lock .

RUN pm2 install pm2-logrotate
RUN pm2 install pm2-server-monit

CMD ["pm2-runtime", "start", "pm2.config.json"]
