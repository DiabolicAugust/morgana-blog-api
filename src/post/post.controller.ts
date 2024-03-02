import {
  Body,
  Controller,
  Delete,
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
import { CreatePostDto } from './dto/create-post.dto.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { PostService } from './post.service.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PayloadDto } from '../service/jwt/dto/payload.dto.js';
import { Constants } from '../data/constants.js';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('get/:id')
  async get(@Param(Constants.id) id: string) {
    return this.postService.get(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getByAuthor/:id')
  async getByAuthor(@Param(Constants.id) author_id: string) {
    return this.postService.getByAuthor(author_id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async delete(@Param(Constants.id) id: string) {
    return this.postService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Patch('update/:id')
  async update(
    @Param(Constants.id) id: string,
    @Body() dto: UpdatePostDto,
    @Query(Constants.client) client: string,
  ) {
    return this.postService.update(id, dto, client);
  }
}
