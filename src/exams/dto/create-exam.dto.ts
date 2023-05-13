import { IsNotEmpty, IsMongoId,IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';
export class CreateExamDto {
  @IsNotEmpty()
  title:string;
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  license_id:ObjectId[];
}
