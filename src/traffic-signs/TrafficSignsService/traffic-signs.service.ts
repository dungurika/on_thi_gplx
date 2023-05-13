import { Injectable } from '@nestjs/common';
import { CreateTrafficSignDto } from '../dto/create-traffic-sign.dto';
import { UpdateTrafficSignDto } from '../dto/update-traffic-sign.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrafficSigns } from '../schemas/traffic_signs.schema';
import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';

@Injectable()
export class TrafficSignsService {
  constructor(
    @InjectModel('TrafficSigns')
    private readonly trafficSignsModel: Model<TrafficSigns>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async getTrafficSigns(): Promise<TrafficSigns[]> {
    return this.trafficSignsModel.find();
  }

  async getTrafficSignsById(traffic_signs_id: string): Promise<TrafficSigns> {
    return this.trafficSignsModel.findById(traffic_signs_id);
  }

  async createTrafficSigns(
    createTrafficSignDto: CreateTrafficSignDto,
  ): Promise<TrafficSigns> {
    const traffic_signs = await this.trafficSignsModel.create(
      createTrafficSignDto,
    );
    return traffic_signs.save();
  }

  async updateTrafficSigns(
    trafficSignsId: string,
    updateTrafficSignsDto: UpdateTrafficSignDto,
  ): Promise<TrafficSigns> {
    return this.trafficSignsModel.findByIdAndUpdate(
      trafficSignsId,
      updateTrafficSignsDto,
      { new: true },
    );
  }

  async deleteTrafficSigns(trafficSignsId: string): Promise<TrafficSigns> {
    return this.trafficSignsModel.findByIdAndDelete(trafficSignsId);
  }

  async uploadTrafficSignsImage(
    trafficSignsId: string,
    file: any,
  ): Promise<{
    message: string;
    success: boolean;
    result: string;
  }> {
    try {
      const trafficSigns = await this.trafficSignsModel.findOne({
        _id: trafficSignsId,
      });
      if (!trafficSigns) {
        throw new Error('Traffic Signs not exist');
      }

      if (trafficSigns?.image) {
        await cloudinary.uploader.destroy(trafficSigns.image, {
          invalidate: true,
        });
      }

      const resOfCloudinary = await cloudinary.uploader.upload(file.path, {
        folder: 'trafficSigns',
        transformation: [
          {
            crop: 'fit',
          },
          { quality: 'auto' },
        ],
      });
      unlinkSync(file.path);
      await this.trafficSignsModel.findOneAndUpdate(
        { _id: trafficSignsId },
        {
          image: resOfCloudinary.secure_url,
        },
      );
      return {
        message: 'Image uploaded successfully',
        success: true,
        result: resOfCloudinary.secure_url,
      };
    } catch (err) {
      throw err;
    }
  }
}
