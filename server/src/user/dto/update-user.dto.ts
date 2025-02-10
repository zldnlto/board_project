import { IsEmail, IsString, MinLength } from 'class-validator';

// NOTE - 전체 유저 정보를 업데이트할 때 사용 (PUT)
// 모든 항목 입력받아야 하므로 필수 필드로 지정한다
export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;
}
