import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../entity/plan.entity';

@Provide()
export class PlanService {
    @InjectEntityModel(Plan)
    planModel: Repository<Plan>;

    async createPlan(plan: Plan) {
        return this.planModel.save(plan);
    }

    async findPlan(author: string) {
        console.log('author:', author);
        const plan = await this.planModel.find({
            where: {
                author,
            },
        });
        console.log('author:', author);
        console.log('Found plan in service:', plan);
        return plan;
    }

    async deletePlan(id: number) {
        return this.planModel.delete({
            id,
        });
    }

    async finishPlan(id: number) {
        return this.planModel.update({
            id,
        }, {
            is_done: true,
        });
    }
    async countPlansByAuthor(author: string) {
        const sum = await this.planModel.count({
          where: {
            author,
          },
        },);
        return sum;
    }
    async countFinishedPlansByAuthor(author: string) {
        const sum = await this.planModel.count({
          where: {
            author,
            is_done: true,
          },
        });
        return sum;
    }

    async findDdl(author: string, deadLineTime: Date) {
        const plan =  await this.planModel.find({
          where: {
            author,
            deadLineTime,
            is_done: false,
          },
        });
        return plan;
    }
}
