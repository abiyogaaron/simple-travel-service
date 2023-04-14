import * as dotenv from 'dotenv';
dotenv.config();

type TEnvKey = 
  | 'env' 
  | 'host' 
  | 'port' 
  | 'jwtSecret';
const configData: Record<TEnvKey, string> = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_SECRET || 'secret999',
};
  
export default configData;
