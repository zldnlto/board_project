import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  // constructor(private prisma: PrismaService) {}
  // 인증 관련 메서드들
  async register(RegisterDto: { username: string; password: string }) {
    return { message: '회원가입 성공', user: 'registerDto' };
  }
  async login(LoginDto: { username: string; password: string }) {
    return { message: '로그인 성공', user: 'loginDto' };
  }
}
