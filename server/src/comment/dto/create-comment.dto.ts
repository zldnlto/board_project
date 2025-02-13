import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: '이거 진짜 말이 안 되는 수준인데요?',
    description: '댓글 내용 (필수)',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
