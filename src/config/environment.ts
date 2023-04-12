import * as dotenv from 'dotenv';
dotenv.config();

const configData = {
  env: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
};
  
export default configData;
