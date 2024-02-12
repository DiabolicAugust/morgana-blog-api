import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './models/post.model.js';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto.js';
import { errorHandlingService } from '../service/error-handling-service.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Strings } from '../data/strings.js';
import { Constants } from '../data/constants.js';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}
  async create(dto: CreatePostDto): Promise<Post> {
    try {
      return (await this.postModel.create(dto)).populate(
        Constants.author,
        Constants.extractPassword,
      );
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async get(id: string) {
    try {
      const post = await this.postModel.findById(id);
      if (post) return post;
      throw errorHandlingService(
        Error(Strings.noPostByID),
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async getByAuthor(author_id: string) {
    try {
      return this.postModel.find({ author: author_id });
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async delete(id: string) {
    try {
      const deletedPost = await this.postModel.findByIdAndDelete(id);
      if (deletedPost) return deletedPost;
      throw errorHandlingService(
        Error(Strings.noPostByID),
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async deleteByAuthor(author_id: string) {
    try {
      return this.postModel.find({ author: author_id }).deleteMany();
    } catch (error) {
      throw errorHandlingService(error);
    }
  }

  async update(id: string, dto: UpdatePostDto, client_id: string) {
    try {
      const post = await this.postModel.findById(id).populate({
        path: Constants.author,
        select: Constants.extractPassword,
      });
      if (!post) throw errorHandlingService(Error(Strings.noPostByID));

      if (post.author.id != client_id) throw new UnauthorizedException();
      const update = await this.postModel.findByIdAndUpdate(id, dto, {
        new: true,
        populate: { path: Constants.author, select: Constants.extractPassword },
      });
      return update;
    } catch (error) {
      throw errorHandlingService(error);
    }
  }
}
