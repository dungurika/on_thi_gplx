import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  Put,
  Query,
  Param,
} from '@nestjs/common';
import { ExamsService } from '../ExamService/exams.service';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { GetExamDto } from '../dto/get-exam.dto';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiExcludeEndpoint()
  async createExam(@Res() res, @Body() createExamDto: CreateExamDto) {
    const postExam = await this.examsService.createExam(createExamDto);
    return res.status(HttpStatus.OK).json({
      message: 'Create Exam Successfully',
      postExam,
    });
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get all exams' })
  @ApiTags('Exams')
  async getExams(@Res() res) {
    const allExams = await this.examsService.getExams();
    if (!allExams) throw new NotFoundException('Exam not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Successfully',
      data: allExams,
    });
  }

  @Get()
  @ApiTags('Exams')
  @ApiOperation({ summary: 'Get all exams by license_id' })
  @ApiQuery({
    name: 'license_id',
    required: true,
    type: String,
    description: 'pass the license_id (can be obtained from /license)',
  })
  async getExamsByLicenseId(@Res() res, @Query() query: GetExamDto) {
    const allExams = await this.examsService.getExamsByLicenseId(query);
    if (!allExams) throw new NotFoundException('Exam not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Successfully to get exams by license_id',
      data: allExams,
    });
  }

  @Put()
  @ApiExcludeEndpoint()
  async updateExam(
    @Res() res,
    @Body() updateExamDto: UpdateExamDto,
    @Query('examId') examId,
  ) {
    const putExam = await this.examsService.updateExam(examId, updateExamDto);
    if (!putExam) throw new NotFoundException('Exam not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Exam Updated Successfully',
      putExam,
    });
  }

  @Delete()
  @ApiExcludeEndpoint()
  async deleteExamById(@Res() res, @Query('examId') examId) {
    const examDelete = await this.examsService.deleteExam(examId);
    if (!examDelete) throw new NotFoundException('Exam not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Exam Deleted Successfully',
      examDelete,
    });
  }
}
