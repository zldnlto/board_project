import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '@/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async signup(signupDto: SignupDto) {
    this.logger.log(
      `🟢 [SIGNUP ATTEMPT] 이메일: ${signupDto.email.split('@')[0]}@***`,
    );

    const existingUser = await this.usersService.findOneByEmail(
      signupDto.email,
    );
    if (existingUser) {
      this.logger.warn(
        `🔴 [SIGNUP FAILED] 이미 사용 중인 이메일로 회원가입 시도`,
      );
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    this.logger.debug(`🔵 [PASSWORD HASHED] 비밀번호 해싱 완료`);

    const user = await this.usersService.create({
      username: signupDto.username,
      email: signupDto.email,
      password: hashedPassword,
    });

    this.logger.log(`✅ [SIGNUP SUCCESS] 회원가입 성공 - user ID: ${user.id}`);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async login(loginDto: LoginDto) {
    this.logger.log(
      `🟢 [LOGIN ATTEMPT] 이메일: ${loginDto.email.split('@')[0]}@***`,
    );

    const user = await this.usersService.findOneByEmail(loginDto.email, true);
    if (!user) {
      this.logger.warn(
        `🔴 [LOGIN FAILED] 로그인 실패 - 존재하지 않는 이메일 또는 비밀번호 불일치`,
      );
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    this.logger.log(`🟢 [USER FOUND] User ID: ${user.id}, 이메일 확인됨`);

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    this.logger.debug(
      `🔵 [PASSWORD CHECK] 비밀번호 검증 결과: ${isPasswordValid}`,
    );

    if (!isPasswordValid) {
      this.logger.warn(
        `🔴 [LOGIN FAILED] 로그인 실패 - 존재하지 않는 이메일 또는 비밀번호 불일치`,
      );
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    this.logger.log(`✅ [LOGIN SUCCESS] 로그인 성공 - user ID: ${user.id}`);

    const payload = { id: user.id, email: user.email };
    console.log(`🟢 [JWT PAYLOAD] ${JSON.stringify(payload)}`);

    try {
      const accessToken = this.jwtService.sign(payload);
      this.logger.log(`🟢 [JWT GENERATED] ${accessToken}`);

      return { access_token: accessToken };
    } catch (error) {
      console.error(`🔴 [JWT SIGN ERROR] ${error.message}`);
      throw new UnauthorizedException('JWT 생성 중 오류가 발생했습니다.');
    }
  }
}
