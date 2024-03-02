import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class GetManyCommentsDto {
  @IsNotEmpty({ message: 'The post_id field can not be empty!' })
  post_id: string;
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @Min(1)
  @Max(100)
  page: number = 1;
}
