import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class GetPostsDto {
  @ApiPropertyOptional({
    example: 1,
    description: '조회할 페이지 번호 (기본값: 1)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: '페이지당 게시글 수 (기본값: 10)',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 3,
    description: '특정 작성자의 게시글만 조회 (optional)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  author?: number;

  @ApiPropertyOptional({
    example: '강철부대',
    description: '제목 또는 내용 검색 (optional)',
  })
  @IsOptional()
  search?: string;
}
