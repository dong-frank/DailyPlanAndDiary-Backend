import {Provide} from '@midwayjs/core';
import {IUserOptions} from '../interface';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../entity/user.entity';
import axios from 'axios';

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
      .set({password: new_password})
      .where('id = :id', {id})
      .execute();
    return result.affected;
  }

  async getWeather(): Promise<any> {
    try {
      const response = await axios.get('https://api.seniverse.com/v3/weather/now.json?key=SmfcziCVwH7eNApo_&location=nanjing&language=zh-Hans&unit=c');
      console.log('response.data:', response.data.results);

      // 提取温度和其他信息
      const result = response.data.results[0];
      const temperature = result.now.temperature;
      const weatherText = result.now.text;
      const lastUpdate = result.last_update;

      console.log('Temperature:', temperature);
      console.log('Weather Text:', weatherText);
      console.log('Last Update:', lastUpdate);

      return {
        temperature,
        weatherText,
        lastUpdate
      };
    } catch (error) {
      console.error('Error fetching data from external API:', error);
      throw error;
    }
  }

}
