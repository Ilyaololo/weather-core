export const AMQP = {
  host: 'localhost',
  port: Number(process.env.RABBITMQ_PORT),
  login: process.env.RABBITMQ_DEFAULT_USER,
  password: process.env.RABBITMQ_DEFAULT_PASS,
};
