import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diary')
export class Diary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'title',
        type: 'text',
    })
    title: string;

    @Column({
        name: 'content',
        type: 'text',
    })
    content: string;

    @Column({
        name: 'created_at',
        type: 'date',
    })
    createdAt: Date;

    @Column({
        name: 'author',
        type: 'text',
    })
    author: string;

    @Column({
        name: 'image_id',
        type: 'int',
    })
    image_id: number;
}
