import { PlanService } from "../service/plan.service";
import { Plan } from '../entity/plan.entity';
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';


@Controller('/plan')
export class PlanController {
    @Inject()
    planService: PlanService;

    @Inject()
    ctx: Context


    @Post('/create_plan')
    async create(@Body() plan: Plan) {
        return await this.planService.createPlan(plan);
    }

    @Get('/show_plan')
    async show(@Query('author') author: string) {
        const a = await this.planService.findPlan(author);
        console.log('Found plan in controller:', a);
        if (a === null) {
            return false;
        }
        return a;
    }

    @Get('/delete_plan')
    async delete(@Query('id') id: number) {
        return await this.planService.deletePlan(id);
    }

    @Get('/finish_plan')
    async update(@Query('id') id: number) {
        return await this.planService.finishPlan(id);
    }

    @Get('/find_ddl')
    async findDdl(@Query('author') author: string, @Query('deadLineTime') deadLineTime: Date) {
        return await this.planService.findDdl(author, deadLineTime);
    }
}
