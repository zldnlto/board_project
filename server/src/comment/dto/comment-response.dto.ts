import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ example: 1, description: '댓글 ID' })
  id: number;

  @ApiProperty({
    example: '이거 진짜 말이 안 되는 수준인데요?',
    description: '댓글 내용',
  })
  content: string;

  @ApiProperty({ example: 3, description: '작성자 ID' })
  authorId: number;

  @ApiProperty({ example: 10, description: '게시글 ID' })
  postId: number;

  @ApiProperty({
    example: '2025-02-13T15:02:16.898Z',
    description: '댓글 작성일',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-13T16:00:00.000Z',
    description: '댓글 수정일',
  })
  updatedAt: Date;
}
