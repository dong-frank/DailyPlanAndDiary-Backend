
import { DiaryService } from '../service/diary.service';
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { PlanService } from '../service/plan.service';
@Controller('/message')
export class HomeController {
  @Inject()
  diaryService: DiaryService;
  planService: PlanService;
  @Get('/countDiariesByAuthor')
  async countDiariesByAuthor(@Query('author') author: string) {
    return await this.diaryService.countDiariesByAuthor(author);
  }
  @Get('/countPlansByAuthor')
  async countPlansByAuthor(@Query('author') author: string) {
    return await this.planService.countPlansByAuthor(author);
  }
  @Get('/countFinishedPlansByAuthor')
  async countFinishedPlansByAuthor(@Query('author') author: string) {
    return await this.planService.countFinishedPlansByAuthor(author);
  }
}
