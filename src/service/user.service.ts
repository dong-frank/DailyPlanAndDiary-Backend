import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async findUser(username: string) {
    const user = await this.userModel.findOne({
      where: {
        username,
      },
    });
    console.log('username:', username);
    console.log('Found user in service:', user);
    return user;
  }
  async createUser(user: User) {
    return this.userModel.save(user); //上传user数据
  }


  async updateSecret(id: number, new_password: string) {
    const result = await this.userModel
      .createQueryBuilder('user')
      .update()
      .set({ password: new_password })
      .where('id = :id', { id })
      .execute();
    return result.affected;
  }
}
