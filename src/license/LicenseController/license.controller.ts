import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateLicenseDto } from '../dto/license.dto';
import { LicenseService } from '../LicenseService/license.service';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get('/list')
  @ApiTags('Licenses')
  @ApiOperation({ summary: 'Get all Licenses' })
  async getAllLicenses(@Res() res) {
    const allLicenses = await this.licenseService.getLicenses();
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      data: allLicenses,
    });
  }

  @Get('/:license_id')
  @ApiTags('Licenses')
  @ApiOperation({ summary: 'Get current data' })
  @ApiParam({
    name: 'license_id',
    required: true,
    type: String,
    description: 'pass the license_id (can be obtained from /license/list)',
  })
  async getLicenseById(@Res() res, @Param('license_id') licenseId) {
    const license = await this.licenseService.getLicenseById(licenseId);
    if (!license) throw new NotFoundException('License not found');
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      data: license,
    });
  }

  @Post()
  @ApiExcludeEndpoint()
  async creatLicense(@Res() res, @Body() createLicenseDTO: CreateLicenseDto) {
    const license = await this.licenseService.createLicense(createLicenseDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Create License Successfully',
      license,
    });
  }

  @Delete()
  @ApiExcludeEndpoint()
  async deleteLicenseById(@Res() res, @Query('licenseId') licenseId) {
    const licenseDelete = await this.licenseService.deleteLicense(licenseId);
    if (!licenseDelete) throw new NotFoundException('License not exists');
    return res.status(HttpStatus.OK).json({
      message: 'License Deleted Successfully',
      licenseDelete,
    });
  }

  @Put()
  @ApiExcludeEndpoint()
  async updateLicense(
    @Res() res,
    @Body() createLicenseDTO: CreateLicenseDto,
    @Query('licenseId') licenseId,
  ) {
    const putLicense = await this.licenseService.updateLicense(
      licenseId,
      createLicenseDTO,
    );
    if (!putLicense) throw new NotFoundException('License not exists');
    return res.status(HttpStatus.OK).json({
      message: 'License Updated Successfully',
      putLicense,
    });
  }
}
