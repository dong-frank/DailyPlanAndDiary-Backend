# Daily Plan and Diary - Backend

## MidwayJS + PostgreSQL

github库：https://github.com/dong-frank/DailyPlanAndDiary-Backend

### 两种启动方式：

**①下载源代码后在根目录下依次执行：**

`npm install`

`npm run build`

`npm run dev`


**②使用pm2:**

先全局安装pm2：`npm install pm2 -g`

再在根目录下依次执行：

`npm install`

`npm run build`

`npm prune --production`

`pm2 start ./bootstrap.js --name backend`


### 若启动不起来，可能的原因：

①7001端口被占用了，请先关闭7001端口，再启动。

②数据库连接失败了，请检查数据库配置文件或确认本地有没有安装数据库。

我们使用的**PostgreSQL**，在`config/config.default.ts`里修改相应配置，主要是`database`和`password`两项，改成自己的数据。 初始synchronize为true，会同步表格信息。
