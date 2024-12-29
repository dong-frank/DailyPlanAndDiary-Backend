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
  format: ['/file/show'],
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: ['.jpg', '.jpeg', '.png'],
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 100000 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'yourpassword', // 改成你的数据库密码
        database: 'daily', // 改成你的数据库名
        synchronize: true, // 新增加表时将其设置为true，其他时候（比如前端发送请求增加数据时）设置为false
        logging: true,
        entities: [File_upload, User, Diary, Plan], // 实体类，每增加一个表，就增加一个，别忘了加
      },
    }
  }
} as MidwayConfig;
