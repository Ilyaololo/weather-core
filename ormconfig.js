module.exports = {
  database: process.env.TYPEORM_DATABASE,
  entities: [
    process.env.TYPEORM_ENTITIES
  ],
  host: process.env.TYPEORM_HOST,
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrations: [
    process.env.TYPEORM_MIGRATIONS
  ],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  password: process.env.TYPEORM_PASSWORD,
  port: Number(process.env.TYPEORM_PORT),
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  type: process.env.TYPEORM_CONNECTION_TYPE,
  username: process.env.TYPEORM_USERNAME,
  cache: process.env.TYPEORM_CACHE === 'true' && {
    type: 'redis',
    duration: 1000 * 5,
    alwaysEnabled: true,
    options: {
      host: 'localhost',
      port: process.env.REDIS_PORT,
    },
  },
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};
