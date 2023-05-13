import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam } from '../schemas/exams.schema';
import { GetExamDto } from '../dto/get-exam.dto';

@Injectable()
export class ExamsService {
  constructor(@InjectModel('Exam') private readonly examModel: Model<Exam>) {}

  async getExams(): Promise<Exam[]> {
    return this.examModel.find();
  }

  async getExamsByLicenseId(query: GetExamDto): Promise<Exam[]> {
    return this.examModel.find({ license_id: query.license_id });
  }

  async createExam(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = await this.examModel.create(createExamDto);
    return exam.save();
  }

  async deleteExam(examId: string): Promise<Exam> {
    return this.examModel.findByIdAndDelete(examId);
  }

  async updateExam(
    examId: string,
    updateExamDto: UpdateExamDto,
  ): Promise<Exam> {
    return this.examModel.findByIdAndUpdate(examId, updateExamDto, {
      new: true,
    });
  }
}
