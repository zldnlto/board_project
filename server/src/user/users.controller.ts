import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserResponseDto } from './dto/user-response.dto';
import { PartialUpdateUserDto } from './dto/update-user-partial.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원 가입 (POST /users)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  // 전체 유저 조회 (GET /users)
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  // 특정 유저 조회 (GET /users/:id)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
    return this.usersService.findOneById(id);
  }

  // 특정 유저 정보 전체 수정 (PUT /users/:id)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  // 특정 유저 정보 일부 수정 (PATCH /users/:id)
  @Patch(':id')
  async partialUpdateUser(
    @Param('id') id: number,
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.partialUpdate(id, partialUpdateUserDto);
  }

  // 특정 유저 삭제 (DELETE /users/:id)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    return this.usersService.delete(id);
  }
}
