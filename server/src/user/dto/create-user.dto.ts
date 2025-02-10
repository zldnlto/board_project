export class CreateUserDto {
  name: string;
  email: string;
  passwordHash: string; // 이미 해싱된 비밀번호
}
