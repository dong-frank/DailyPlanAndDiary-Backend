import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan')
export class Plan {
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
        name: 'importance',
        type: 'int',
    })
    importance: number;

    @Column({
        name: 'dead_line_time',
        type: 'timestamp',
    })
    deadLineTime: Date;

    @Column({
        name: 'author',
        type: 'text',
    })
    author: string;
}
