import {IsNotEmpty} from "class-validator";


export class CreateTrafficSignDto {
  @IsNotEmpty()
  category_sign:string;
  @IsNotEmpty()
  title:string;
  @IsNotEmpty()
  short_description:string;
  @IsNotEmpty()
  details_description:string;
  @IsNotEmpty()
  image:string;
}




