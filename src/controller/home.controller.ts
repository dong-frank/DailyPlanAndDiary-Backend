
import { DiaryService } from '../service/diary.service';
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { PlanService } from '../service/plan.service';
import {UserService} from "../service/user.service";

@Controller('/message')
export class HomeController {

  @Inject()
  diaryService: DiaryService;

  @Inject()
  planService: PlanService;

  @Inject()
  userService: UserService;

  @Get('/countDiariesByAuthor')
  async countDiariesByAuthor(@Query('author') author: string) {
    console.log('countDiariesByAuthor:', author);
    return await this.diaryService.countDiariesByAuthor(author);
  }

  @Get('/countPlansByAuthor')
  async countPlansByAuthor(@Query('author') author: string) {
    console.log('countPlansByAuthor:', author);
    return await this.planService.countPlansByAuthor(author);
  }
  @Get('/countFinishedPlansByAuthor')
  async countFinishedPlansByAuthor(@Query('author') author: string) {
    console.log('countFinishedPlansByAuthor:', author);
    return await this.planService.countFinishedPlansByAuthor(author);
  }

  @Get('/weather')
  async weather() {
    return await this.userService.getWeather();
  }
}
