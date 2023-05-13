import { Module } from '@nestjs/common';
import { ExamsService } from './ExamService/exams.service';
import { ExamsController } from './ExamController/exams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSchema } from './schemas/exams.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Exam',
        schema: ExamSchema,
      },
    ]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
