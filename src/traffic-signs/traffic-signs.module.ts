import { Module } from '@nestjs/common';
import { TrafficSignsService } from './TrafficSignsService/traffic-signs.service';
import { TrafficSignsController } from './TrafficSignsController/traffic-signs.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { TrafficSignsSchema } from "./schemas/traffic_signs.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'TrafficSigns',
        schema:TrafficSignsSchema
      },
    ]),
  ],
  controllers: [TrafficSignsController],
  providers: [TrafficSignsService]
})
export class TrafficSignsModule {}
