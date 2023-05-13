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
  ParseBoolPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuestionsService } from '../QuestionService/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiExcludeEndpoint()
  async createQuestion(
    @Res() res,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    const postQuestion = await this.questionsService.createQuestion(
      createQuestionDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Create Question Successfully',
      postQuestion,
    });
  }

  @Get('/list')
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all questions' })
  @ApiQuery({
    name: 'from',
    required: false,
    type: Number,
    description: '',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    type: Number,
  })
  async getAllQuestions(
    @Res() res,
    @Query('from') from?: number,
    @Query('to') to?: number,
  ) {
    const allQuestions = await this.questionsService.getQuestions(from, to);
    return res.status(HttpStatus.OK).json({
      message: 'Success to get all questions',
      data: allQuestions,
    });
  }

  @Get()
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all questions by exam_id and license_id' })
  @ApiQuery({
    name: 'license_id',
    required: true,
    type: String,
    description: 'pass the licesen_id (can be obtained from /license/list)',
  })
  @ApiQuery({
    name: 'exam_id',
    required: true,
    type: String,
    description: 'pass the exam_id (can be obtained from /exam/list)',
  })
  async getAllQuestionsByExamAndLicense(
    @Res() res,
    @Query('exam_id') exam_id: string,
    @Query('license_id') license_id: string,
  ) {
    const allQuestions =
      await this.questionsService.getQuestionsByExamAndLicense(
        exam_id,
        license_id,
      );
    return res.status(HttpStatus.OK).json({
      message: 'Success to get questions',
      data: allQuestions,
    });
  }

  @Get('/:license_id/top_wrong_question')
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all top questions wrong' })
  @ApiParam({
    name: 'license_id',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'top_wrong_question',
    required: false,
    type: Boolean,
    enum: ['true', 'false'],
    description: 'Get top wrong questions or all questions [default: true]',
  })
  async getTopWrongQuestion(
    @Res() res,
    @Query('top_wrong_question', ParseBoolPipe)
    top_wrong_question: boolean = true,
  ) {
    const allQuestions = await this.questionsService.getQuestionByQuery(
      top_wrong_question ?? true,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Successfully to get top questions',
      data: allQuestions,
    });
  }

  @Get('/:license_id/type')
  @ApiTags('Questions')
  @ApiOperation({ summary: 'Get all type questions' })
  @ApiParam({
    name: 'license_id',
    required: true,
    type: String,
    description: 'pass the license_id (can be obtained from /licese/list)',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'vailid value: Require Question',
  })
  async getQuestionByType(@Res() res, @Query('type') type: string) {
    const allQuestions = await this.questionsService.getQuestionByQuery(
      null,
      type,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Successfully to get type',
      data: allQuestions,
    });
  }

  // async getQuestionsByRange(
  //   @Res() res,
  //   @Query('start') start: number,
  //   @Query('end') end: number,
  // ): Promise<Question[]> {
  //   const questions = await this.questionsService.getQuestionsByRange(start, end);
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Success to get questions',
  //     data: questions,
  //   });
  // }

  // @Get('/:license_id/top_wrong_question')
  // @ApiTags('Questions')
  // @ApiOperation({ summary: 'Get all top questions wrong' })
  // @ApiParam({
  //   name: 'license_id',
  //   required: true,
  //   type: String,
  // })
  // @ApiQuery({
  //   name: 'top_wrong_question',
  //   required: false,
  //   type: Boolean,
  //   enum: ['true', 'false'],
  //   description: 'Get top wrong questions or all questions [default: true]',
  // })
  // async getQuestionsByRange(
  //   @Res() res,
  //   @Query('top_wrong_question', ParseBoolPipe)
  //   top_wrong_question: boolean = true,
  // ) {
  //   const allQuestions = await this.questionsService.getQuestionByQuery(
  //     top_wrong_question ?? true,
  //   );
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Successfully to get top questions',
  //     data: allQuestions,
  //   });
  // }

  @Put()
  @ApiExcludeEndpoint()
  async updateQuestion(
    @Res() res,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Query('questionId') questionId,
  ) {
    const putQuestion = await this.questionsService.updateQuestion(
      questionId,
      updateQuestionDto,
    );
    if (!putQuestion) throw new NotFoundException('Question not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Question Updated Successfully',
      putQuestion,
    });
  }

  @Delete()
  @ApiExcludeEndpoint()
  async deleteQuestionById(@Res() res, @Query('questionId') questionId) {
    const questionDelete = await this.questionsService.deleteQuestion(
      questionId,
    );
    if (!questionDelete) throw new NotFoundException('Question not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Question Deleted Successfully',
      questionDelete,
    });
  }

  @Post('/:id/image')
  @ApiExcludeEndpoint()
  @UseInterceptors(
    FileInterceptor('questionImage', {
      dest: '../uploads/',
    }),
  )
  async uploadTrafficSignsImage(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    return await this.questionsService.uploadQuestionsImage(id, file);
  }
}
