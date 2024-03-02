import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { Constants } from '../data/constants.js';
import { GetManyCommentsDto } from './dto/get-many-comments.dto.js';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post('create')
  async create(
    @Body() dto: CreateCommentDto,
    @Query(Constants.client) author: string,
  ) {
    dto.author = author;
    return this.commentService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('getById/:id')
  async getById(@Param(Constants.id) id: string) {
    return this.commentService.get(id);
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Get('getMany')
  async getMany(@Body() dto: GetManyCommentsDto) {
    return this.commentService.getMany(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  async update(
    @Param(Constants.id) id: string,
    @Body('description') description: string,
  ) {
    return this.commentService.update(id, description);
  }
}
