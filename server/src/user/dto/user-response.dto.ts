import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: '사용자의 고유 ID (자동 증가 숫자)' })
  id: number;

  @ApiProperty({ example: '김키위', description: '사용자 이름' })
  username: string;

  @ApiProperty({ example: 'kiwisae@example.com', description: '사용자 이메일' })
  email: string;

  @ApiProperty({
    example: '2025-02-12T10:00:00.000Z',
    description: '계정 생성 날짜',
  })
  createdAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
