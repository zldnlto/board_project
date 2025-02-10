import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

// NOTE - 일부 필드만 선택적으로 수정할 수 있도록 모든 필드가 선택적임 (PATCH 요청)
export class PartialUpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password?: string;
}
