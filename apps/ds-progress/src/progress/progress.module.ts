import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { progressShema } from 'apps/ds-progress/src/schemas/progress';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'progress', schema: progressShema}])],
  controllers: [ProgressController],
  providers: [ProgressService]
})
export class ProgressModule {}
