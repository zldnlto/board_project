import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: '다시 보니까 더 놀랍네요 덜덜',
    description: '수정할 댓글 내용',
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;
}
