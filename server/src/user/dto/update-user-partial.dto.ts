import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// NOTE - 일부 필드만 선택적으로 수정할 수 있도록 모든 필드가 선택적임 (PATCH 요청)
export class PartialUpdateUserDto {
  @ApiPropertyOptional({ description: '유저 이름', example: '김키위' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: '유저 이메일',
    example: 'kiwisae@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: '유저 비밀번호 (최소 6자 이상)',
    example: 'password123',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password?: string;
}
