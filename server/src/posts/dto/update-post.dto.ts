import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    example: '내일은 금요일',
    description: '게시글 제목',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiProperty({
    example: '강철지구 하는 날!',
    description: '게시글 내용',
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: '자유', description: '카테고리', required: false })
  @IsString()
  @IsOptional()
  category?: string;
}
