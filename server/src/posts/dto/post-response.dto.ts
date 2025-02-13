import { UserResponseDto } from '@/user/dto/user-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: 1, description: '게시글 ID' })
  id: number;

  @ApiProperty({
    example: '강철부대 박보람 48초 저격 보셨어여??',
    description: '게시글 제목',
  })
  title: string;

  @ApiProperty({
    example:
      '맙소사 표적 5개를 총알 4발로 48초만에 끝냈다구요 너무대단해 저격개시탕!!',
    description: '게시글 내용',
  })
  content: string;

  @ApiProperty({ example: '자유', description: '카테고리', required: false })
  category?: string;

  @ApiProperty({ example: 14, description: '작성자 ID' })
  authorId: number;

  @ApiProperty({ description: '게시글 작성자 정보', type: UserResponseDto })
  author?: UserResponseDto;

  @ApiProperty({
    example: '2025-02-13T14:26:13.291Z',
    description: '게시글 생성일',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-13T14:26:13.291Z',
    description: '게시글 수정일',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2025-02-14T10:30:00.000Z',
    description: '게시글 삭제 시간',
    required: false,
  })
  deletedAt?: Date;
}
