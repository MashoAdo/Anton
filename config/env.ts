import dotenv from "dotenv";

dotenv.config();

const env = {
  mongoDBConfig: {
    uri: process.env.MONGOOSE_URI,
  },
  jwtAccessSecret: {
    secret: process.env.ACCESS_TOKEN_SECRET,
  },
};

export default env;
