import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps:true,
  collection:'traffic_signs'
})
export class TrafficSigns {
  @Prop()
  category_sign:string;
  @Prop()
  title:string;
  @Prop()
  short_description:string;
  @Prop()
  details_description:string;
  @Prop()
  image:string;
}

export const TrafficSignsSchema = SchemaFactory.createForClass(TrafficSigns)
