import { MidwayConfig } from '@midwayjs/core';
import { File_upload } from '../entity/file.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1732851060186_299',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
    host: '0.0.0.0',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'rds364408', // 改成你的数据库密码
        database: 'postgres', // 改成你的数据库名
        synchronize: true, // 新增加表时将其设置为true，其他时候（比如前端发送请求增加数据时）设置为false
        logging: true,
        entities: [File_upload], // 实体类，每增加一个表，就增加一个，别忘了加
      },
    }
  }
} as MidwayConfig;
