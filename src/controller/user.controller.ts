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
}
