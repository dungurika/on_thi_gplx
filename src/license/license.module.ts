import { Module } from '@nestjs/common';
import { LicenseService } from "./LicenseService/license.service";
import { LicenseController } from "./LicenseController/license.controller";
import { LicenseSchema } from "./schemas/license.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'License',
        schema:LicenseSchema
      },
    ]),
  ],
  controllers:[LicenseController],
  providers:[LicenseService]
})
export class LicenseModule {}
