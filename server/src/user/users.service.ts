import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateUserDto } from './dto/update-user-partial.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // GET/users 전체 유저 조회
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }

  // GET/users/:id 특정 유저 조회
  async findOneById(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException(`🚫id가 '${id}'인 유저를 찾을 수 없습니다.`);
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  async findOneByEmail(
    email: string,
    includePassword = false,
  ): Promise<(UserResponseDto & { password?: string }) | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        password: includePassword,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  // POST 회원가입 (Auth에서 처리함, create는 내부 호출용)
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  // PUT/users/:id 전체 정보 수정
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  // PATCH/users/:id 부분 정보 수정
  async partialUpdate(
    id: number,
    partialUpdateUserDto: PartialUpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: partialUpdateUserDto,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  // DELETE /users/:id 유저 정보 삭제
  async delete(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`🚫id가 '${id}'인 유저를 찾을 수 없습니다.`);
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: `🚮id: ${id} 인 유저의 정보가 삭제되었습니다.` };
  }
}
