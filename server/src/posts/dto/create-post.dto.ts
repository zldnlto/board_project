import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: '강철부대 박보람 48초 저격 보셨어여??',
    description: '게시글 제목',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example:
      '맙소사 표적 5개를 총알 4발로 48초만에 끝냈다구요 너무대단해 저격개시탕!!',
    description: '게시글 내용',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '자유', description: '카테고리', required: false })
  @IsString()
  @IsOptional()
  category?: string;
}
