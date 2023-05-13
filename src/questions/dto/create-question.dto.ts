import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { questionType } from '../schemas/questions.schema';
import { ObjectId } from 'mongoose';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  answers: string[];

  @IsString()
  @IsEnum(questionType)
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  explanation: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  @IsOptional()
  totalTime: number;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  exam_id: ObjectId[];
}

export class PaginationQuestionDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  limit: number;
}
