import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from '../entity/diary.entity';

@Provide()
export class DiaryService {
    @InjectEntityModel(Diary)
    diaryModel: Repository<Diary>;

    async createDiary(diary: Diary) {
        return this.diaryModel.save(diary);
    }

    async findDiary(author: string,createdAt: Date) {
        const diary = await this.diaryModel.find({
            where: {
                author,
                createdAt,
            },
        });
        console.log('author:', author);
        console.log('created_at:', createdAt);
        console.log('Found diary in service:', diary);
        return diary;
    }

    async findDiaryByName(author: string) {
        const diary = await this.diaryModel.find({
            where: {
                author
            },
        });
        console.log('author:', author);
        console.log('Found diary in service by name');
        return diary;
    }
}
