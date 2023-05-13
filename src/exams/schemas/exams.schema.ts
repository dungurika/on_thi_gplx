import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';
@Schema({
  timestamps: true,
  collection: 'exams',
})
export class Exam {
  @Prop()
  title: string;
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'License' })
  license_id: ObjectId[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
