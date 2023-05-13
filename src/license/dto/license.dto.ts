import { IsNotEmpty } from 'class-validator';

export class CreateLicenseDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
