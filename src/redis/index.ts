import Redis from 'ioredis';
import env from '../config/environment';

class RedisConn {
  private static instance: Redis;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisConn.instance) {
      RedisConn.instance = new Redis({
        port: Number(env.redisMasterPort),
        host: env.redisMasterHost,
        name: 'master',
        password: env.redisPass,
        preferredSlaves: [
          { ip: env.redisSlaveHost, port: env.redisSlavePort, prio: 1 },
        ],
      });
    }
    return RedisConn.instance;
  }
}

export default RedisConn.getInstance();
