import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  NotFoundException,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TrafficSignsService } from '../TrafficSignsService/traffic-signs.service';
import { CreateTrafficSignDto } from '../dto/create-traffic-sign.dto';
import { UpdateTrafficSignDto } from '../dto/update-traffic-sign.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('traffic-signs')
export class TrafficSignsController {
  constructor(private readonly trafficSignsService: TrafficSignsService) {}

  @Post()
  @ApiExcludeEndpoint()
  async createTrafficSigns(
    @Res() res,
    @Body() createTrafficSignDto: CreateTrafficSignDto,
  ) {
    const postTrafficSigns = await this.trafficSignsService.createTrafficSigns(
      createTrafficSignDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Create TrafficSigns Successfully',
      postTrafficSigns,
    });
  }

  @Get('/list')
  @ApiTags('TrafficSigns')
  @ApiOperation({ summary: 'Get all TrafficSigns' })
  async getAllTrafficSigns(@Res() res) {
    const allTrafficSigns = await this.trafficSignsService.getTrafficSigns();
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      data: allTrafficSigns,
    });
  }

  @Get('/:traffic_signs_id')
  @ApiTags('TrafficSigns')
  @ApiOperation({ summary: 'Get current data ' })
  @ApiParam({
    name: 'traffic_signs_id',
    required: true,
    type: String,
    description:
      'pass the trafficSignsId (can be obtained from /traffic-signs/list)',
  })
  async getTrafficSignsById(
    @Res() res,
    @Param('traffic_signs_id') traffic_signs_id,
  ) {
    const trafficSigns = await this.trafficSignsService.getTrafficSignsById(
      traffic_signs_id,
    );
    if (!trafficSigns) throw new NotFoundException('TrafficSigns not found');
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      data: trafficSigns,
    });
  }

  @Put()
  @ApiExcludeEndpoint()
  async updateTrafficSigns(
    @Res() res,
    @Body() updateTrafficSignsDto: UpdateTrafficSignDto,
    @Query('trafficSignsId') trafficSignsId,
  ) {
    const putTrafficSigns = await this.trafficSignsService.updateTrafficSigns(
      trafficSignsId,
      updateTrafficSignsDto,
    );
    if (!putTrafficSigns)
      throw new NotFoundException('TrafficSigns not exists');
    return res.status(HttpStatus.OK).json({
      message: 'TrafficSigns Updated Successfully',
      putTrafficSigns,
    });
  }

  @Delete()
  @ApiExcludeEndpoint()
  async deleteLicenseById(@Res() res, @Query('trafficSignsId') trafficSignsId) {
    const trafficSignsDelete =
      await this.trafficSignsService.deleteTrafficSigns(trafficSignsId);
    if (!trafficSignsDelete)
      throw new NotFoundException('TrafficSigns not exists');
    return res.status(HttpStatus.OK).json({
      message: 'TrafficSigns Deleted Successfully',
      trafficSignsDelete,
    });
  }

  @Post('/:id/image')
  @ApiExcludeEndpoint()
  @UseInterceptors(
    FileInterceptor('trafficSignsImage', {
      dest: '../uploads/',
    }),
  )
  async uploadTrafficSignsImage(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    return await this.trafficSignsService.uploadTrafficSignsImage(id, file);
  }
}
