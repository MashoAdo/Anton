import dotenv from "dotenv";

dotenv.config();

const env = {
  mongoDBUri: process.env.MONGOOSE_URI,
  jwtAccessSecret: process.env.ACCESS_TOKEN_SECRET,
};

export default env;
