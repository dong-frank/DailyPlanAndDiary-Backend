import { DiaryService } from '../service/diary.service';
import { Diary } from '../entity/diary.entity';
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/diary')
export class DiaryController {
    @Inject()
    diaryService: DiaryService;
    @Inject()
    ctx: Context;

    @Post('/create_diary')
    async create(@Body() diary: Diary) {
        return await this.diaryService.createDiary(diary);
    }

    @Get('/show_diary')
    async show(@Query('author') author: string, @Query('createdAt') createdAt: Date) {
        const a = await this.diaryService.findDiary(author, createdAt);
        console.log('Found diary in controller:', a);
        if (a === null) {
            return false;
        }
        return a;
    }
}
