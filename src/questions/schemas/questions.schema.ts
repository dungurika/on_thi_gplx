import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, ObjectId } from 'mongoose';

export enum questionType {
  mediumQuestion = 'Medium Question',
  requireQuestion = 'Require Question',
}

@Schema({
  timestamps: true,
  collection: 'questions',
})
@Schema()
export class Question {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: [String], required: true })
  answers: string[];

  @Prop({ type: String, required: true })
  correct_answer: string;

  @Prop({
    type: String,
    required: true,
    enum: [questionType.requireQuestion, questionType.mediumQuestion],
  })
  type: string;

  @Prop({ type: String, required: true })
  explanation: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Number })
  total_time?: number;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Exam' })
  exam_id: ObjectId[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'License' })
  license_id: ObjectId[];

  @Prop({ type: Boolean })
  top_wrong_question: boolean;
}
export const QuestionsSchema = SchemaFactory.createForClass(Question);
