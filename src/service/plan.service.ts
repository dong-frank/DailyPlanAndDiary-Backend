import { Provide } from "@midwayjs/core";
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
}