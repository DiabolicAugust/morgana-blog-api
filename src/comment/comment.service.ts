import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comment } from './models/comment.model.js';
import { Model } from 'mongoose';
import { errorHandlingService } from '../service/error-handling-service.js';
import { NameEnum, Strings } from '../data/strings.js';
import { GetManyCommentsDto } from './dto/get-many-comments.dto.js';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async create(dto: CreateCommentDto) {
    try {
      return this.commentModel.create(dto);
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async get(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      if (!comment) {
        throw errorHandlingService(Error('No comment with this id'));
      }
      return comment;
    } catch (error) {
      errorHandlingService(error);
    }
  }

  async getMany(dto: GetManyCommentsDto) {
    const comments = await this.commentModel
      .find({ post: dto.post_id })
      .skip((dto.page - 1) * dto.limit)
      .limit(dto.limit);

    const count = await this.commentModel.countDocuments({ post: dto.post_id });
    return { comments: comments, total_count: count };
  }

  async delete(id: string) {
    try {
      const comment = await this.commentModel.findByIdAndDelete(id);
      if (!comment) {
        throw errorHandlingService(Error('No comment with this id'));
      }
      return comment;
    } catch (error) {
      errorHandlingService(error);
    }
  }

  async deleteByPost(id: string) {
    try {
      const comments = await this.commentModel.deleteMany({ post: id });

      return comments;
    } catch (error) {
      errorHandlingService(error);
    }
  }
  async update(id: string, description: string) {
    try {
      const comment = await this.commentModel.findByIdAndUpdate(
        id,
        { description: description },
        { new: true },
      );
      if (!comment) {
        throw errorHandlingService(
          Error(Strings.notFoundById(NameEnum.Comment)),
        );
      }
      return comment;
    } catch (error) {
      errorHandlingService(error);
    }
  }
}
