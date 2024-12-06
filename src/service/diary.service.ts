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

    async findDiary(author: string) {
        const diary = await this.diaryModel.find({
            where: {
                author,
            },
        });
        console.log('author:', author);
        console.log('Found diary in service:', diary);
        return diary;
    }
}