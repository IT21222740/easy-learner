import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { progress } from 'apps/ds-progress/src/schemas/progress';

@Injectable()
export class ProgressService {
    constructor(
        @InjectModel(progress.name)
        private progressModel : mongoose.Model<progress>

    ){}

    async findAll(): Promise<progress[]>{
        const progress = await this.progressModel.find();
        return progress;
    }

    async create(courseP: progress): Promise<progress>{
        const res = await this.progressModel.create(courseP);
        return res
    }

    async findByUserIdAndCourseId(userId: string, courseId: string): Promise<progress> {
        const res = await this.progressModel.findOne({ user_id: userId, course_id: courseId }).exec();
        

        if(!res){
            throw new NotFoundException('course not found');
        }

        return res
    }

    async findByUserId(userId: string): Promise<progress[]>{
        const response = await this.progressModel.find({user_id: userId}).exec();

        if(!response){

            throw new NotFoundException('course not found');
        }
        return response
    }

    async incrementCompleted(userId: string, courseId: string): Promise<void> {
        await this.progressModel.updateOne({ user_id: userId, course_id: courseId }, { $inc: { num_of_completed: 1 } }).exec();
    }
}
