import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'username', //在表单里显示的名字
    type: 'text',
  })
  username: string; //实际名字：类型

  @Column({
    type: 'text',
    name: 'password',
  })
  password: string;
}
