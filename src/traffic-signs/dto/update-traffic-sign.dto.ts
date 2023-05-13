import { PartialType } from '@nestjs/mapped-types';
import { CreateTrafficSignDto } from './create-traffic-sign.dto';

export class UpdateTrafficSignDto extends PartialType(CreateTrafficSignDto) {}
