import { Module } from '@nestjs/common';
import { QuestionsService } from './QuestionService/questions.service';
import { QuestionsController } from './QuestionController/questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsSchema } from './schemas/questions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Question',
        schema: QuestionsSchema,
      },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
