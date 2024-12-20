import { MidwayConfig } from '@midwayjs/core';
import { File_upload } from '../entity/file.entity';
import { User } from '../entity/user.entity';
import { Diary } from '../entity/diary.entity';
import { Plan } from '../entity/plan.entity';

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
  jwt: {
    secret: 'YEONJUNBEOMGYU1399', // 密钥
    expiresIn: '2h', // 过期时间
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'postgres', // 改成你的数据库密码
        database: 'daily', // 改成你的数据库名
        synchronize: false, // 新增加表时将其设置为true，其他时候（比如前端发送请求增加数据时）设置为false
        logging: true,
        entities: [File_upload, User, Diary, Plan], // 实体类，每增加一个表，就增加一个，别忘了加
      },
    }
  }
} as MidwayConfig;
