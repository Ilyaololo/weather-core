export const APP = {
  CORS: {
    allowedHeaders: ['origin', 'content-type'],
    credentials: true,
    methods: ['DELETE', 'GET', 'OPTIONS', 'POST', 'PUT'],
    optionsSuccessStatus: 204,
    origin: `http://localhost:${process.env.APP_PORT}`,
    preflightContinue: false,
  },
};
