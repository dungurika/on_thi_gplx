import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetQuestionDto {
  exam_id?: string;
  license_id?: string;
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  topWrongQuestion?: boolean;
}
