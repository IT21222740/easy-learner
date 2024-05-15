import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { progress } from 'apps/ds-progress/src/schemas/progress';
import { ProgressDto } from './dto/progress.dto';

@Controller('progress')
export class ProgressController {
    constructor(private progressService: ProgressService){}

    @Get()
    async getAllProgress(): Promise<progress[]>{
        return this.progressService.findAll();
    }

    @Post()
    async createProgress(
        @Body()
        progress: ProgressDto,
    ): Promise<progress>{
        return this.progressService.create(progress);
    }
    

    @Get(':userId/:courseId')
    async getProgress(
        @Param('userId')
        userId: string,
        @Param('courseId')
        courseId: string
    ): Promise<progress>{
        return this.progressService.findByUserIdAndCourseId(userId, courseId);
    }

    @Get(':userId')
    async getwithFilter(
        @Param('userId')
        userId: string
    ): Promise<progress[]>{
        return this.progressService.findByUserId(userId);
    }

    


    @Put('incrementCompleted/:userId/:courseId')
    async incrementCompleted(
        @Param('userId') userId: string, 
        @Param('courseId') courseId: string
    ): Promise<void> {
        await this.progressService.incrementCompleted(userId, courseId);
    }
    
}
