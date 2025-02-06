import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
