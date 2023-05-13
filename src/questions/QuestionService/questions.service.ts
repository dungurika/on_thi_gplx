import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../schemas/questions.schema';
import { GetQuestionDto } from '../dto/get-question.dto';
import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly questionsModel: Model<Question>,
  ) {}

  async getQuestions(from: number, to: number): Promise<Question[]> {
    // const { exam_id } = query;
    // if (!exam_id || !license_id) {
    //   return this.questionsModel.find();
    // }
    // return this.questionsModel.find({
    //   $and: [{ license_id: license_id }, { exam_id: exam_id }],
    // });
    if (!from && !to) {
      // return this.questionsModel.find({ });
      return this.questionsModel.aggregate([{ $sample: { size: 25 } }]);
    }
    return this.questionsModel
      .find()
      .skip(from - 1)
      .limit(to - from + 1);
  }

  async getQuestionsByExamAndLicense(
    exam_id: any,
    license_id: any,
  ): Promise<Question[]> {
    return this.questionsModel.find({
      $and: [{ license_id: license_id }, { exam_id: exam_id }],
    });
  }

  async getQuestionByQuery(
    top_wrong_question?: boolean,
    type?: string,
  ): Promise<Question[]> {
    let questions = await this.questionsModel.find();

    if (top_wrong_question === true) {
      questions = questions.filter(
        (question) => question.top_wrong_question === true,
      );
    } else if (type) {
      questions = questions.filter(
        (question) => question.type === 'Require Question',
      );
    }

    return questions;
  }

  async getQuestionById(questionId: string): Promise<Question> {
    return this.questionsModel.findById(questionId);
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionsModel.create(createQuestionDto);
    return question.save();
  }

  async updateQuestion(
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionsModel.findByIdAndUpdate(
      questionId,
      updateQuestionDto,
      { new: true },
    );
  }

  async deleteQuestion(questionId: string): Promise<Question> {
    return this.questionsModel.findByIdAndDelete(questionId);
  }

  async uploadQuestionsImage(
    questionId: string,
    file: any,
  ): Promise<{
    message: string;
    success: boolean;
    result: string;
  }> {
    try {
      const questions = await this.questionsModel.findOne({
        _id: questionId,
      });
      if (!questions) {
        throw new Error('Questions not exist');
      }

      if (questions?.image) {
        await cloudinary.uploader.destroy(questions.image, {
          invalidate: true,
        });
      }

      const resOfCloudinary = await cloudinary.uploader.upload(file.path, {
        folder: 'questions',
        transformation: [
          {
            crop: 'fit',
          },
          { quality: 'auto' },
        ],
      });
      unlinkSync(file.path);
      await this.questionsModel.findOneAndUpdate(
        { _id: questionId },
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
