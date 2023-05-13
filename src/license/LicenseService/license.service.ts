import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
// import { License } from "../types/license.interface";
import { CreateLicenseDto } from "../dto/license.dto";
import { License } from "../schemas/license.schema";

@Injectable()
export class LicenseService {

  constructor(@InjectModel('License') private readonly licenseModel: Model<License>) {}

 async getLicenses() :Promise<License[]>{
   return this.licenseModel.find();
  }

  async getLicenseById(licenseId:string) :Promise<License>{
    return this.licenseModel.findById(licenseId)
  }

  async createLicense(createLicenseDto:CreateLicenseDto) :Promise<License>{
    const license = await this.licenseModel.create(createLicenseDto)
    return license.save();
  }

  async deleteLicense(licenseId :string):Promise<License>{
    return this.licenseModel.findByIdAndDelete(licenseId);
  }

  async updateLicense(licenseId:string,createLicenseDTO:CreateLicenseDto):Promise<License>{
    return this.licenseModel.findByIdAndUpdate(licenseId,createLicenseDTO,{new:true});
  }
}
