import * as dotenv from 'dotenv';
dotenv.config();

type TEnvKey = 
  | 'env' 
  | 'host' 
  | 'port' 
  | 'jwtSecret'
  | 'redisMasterHost'
  | 'redisMasterPort'
  | 'redisPass'
  | 'redisSlaveHost'
  | 'redisSlavePort';
const configData: Record<TEnvKey, string> = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_SECRET || 'secret999',

  redisMasterHost: process.env.REDIS_MASTER_HOST || 'localhost',
  redisMasterPort: process.env.REDIS_MASTER_PORT || '6379',
  redisPass: process.env.REDIS_PASSWORD || 'secret456',
  redisSlaveHost: process.env.REDIS_SLAVE_HOST || 'localhost',
  redisSlavePort: process.env.REDIS_SLAVE_PORT || '6380',
};
  
export default configData;
