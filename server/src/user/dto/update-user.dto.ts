import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// NOTE - 전체 유저 정보를 업데이트할 때 사용 (PUT)
// 모든 항목 입력받아야 하므로 필수 필드로 지정한다
export class UpdateUserDto {
  @ApiProperty({ description: '유저 이름', example: '김키위' })
  @IsString()
  username: string;

  @ApiProperty({ description: '유저 이메일', example: 'kiwisae@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '유저 비밀번호 (최소 6자 이상)',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;
}
