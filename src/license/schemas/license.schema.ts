import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'licenses',
})
export class License {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const LicenseSchema = SchemaFactory.createForClass(License);
