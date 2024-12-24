import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  @Inject()
  jwtService: JwtService;

  @Post('/create_user')
  async create(@Body() user: User) {
    return await this.userService.createUser(user);
  }

  @Get('/find_user')
  async find(@Query('username') username: string) {
    const a = await this.userService.findUser(username);
    console.log('Found user in controller:', a);
    if (a === null) {
      return false;
    }
    return a.username;
  }

  @Post('/password')
  async password(@Body() user: User) {
    const user2 = await this.userService.findUser(user.username);
    if (user2.password === user.password) {
      const token = await this.jwtService.sign({ username: user.username });
      return { token };
    }
    return false;
  }

  @Get('/get_name')
  async protectedRoute() {
    try {
      const token = this.ctx.request.header.authorization.split(' ')[1];
      this.ctx.state.user = await this.jwtService.verify(
        token,
        'YEONJUNBEOMGYU1399' // 确保这里使用的是正确的密钥
      );
      const username = this.ctx.state.user.username;
      return { username };
    } catch (error) {
      if (error) {
        this.ctx.status = 401;
        this.ctx.body = { error: 'Invalid token' };
      } else {
        this.ctx.status = 500;
        this.ctx.body = { error: 'Internal server error' };
      }
    }
  }

  @Post('/update_password')
  async updatePassword(@Body('username') username: string, @Body('currentPassword') currentPassword: string, @Body('newPassword') newPassword: string) {
    const user = await this.userService.findUser(username);
    console.log(username);
    if (user && user.password === currentPassword && user.password !== newPassword) {
      await this.userService.updateSecret(user.id, newPassword);
      return { success: true, message: '密码修改成功' };
    }else if(user && user.password !== currentPassword){
      return { success: false, message: '密码修改失败,当前密码错误' };
    }else if(user && user.password === newPassword){
      return { success: false, message: '密码修改失败,新密码与旧密码相同' };
  }
}
}
