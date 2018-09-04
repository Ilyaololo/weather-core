export const JWT = {
  secretOrPrivateKey: process.env.JWT_SECRET_TOKEN,
  signOptions: {
    expiresIn: 3600,
  },
};
