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
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserResponseDto } from './dto/user-response.dto';
import { PartialUpdateUserDto } from './dto/update-user-partial.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // // 회원 가입 (POST /users)
  // @Post()
  // @ApiOperation({ summary: '회원가입' })
  // @ApiResponse({
  //   status: 201,
  //   description: '유저가 성공적으로 생성되었습니다.',
  //   type: UserResponseDto,
  // })
  // async createUser(
  //   @Body() createUserDto: CreateUserDto,
  // ): Promise<UserResponseDto> {
  //   const user = await this.usersService.create(createUserDto);
  //   return {
  //     id: user.id,
  //     username: user.username,
  //     email: user.email,
  //     createdAt: user.createdAt,
  //   };
  // }

  // 전체 유저 조회 (GET /users)
  @Get()
  @ApiOperation({ summary: '전체 유저 조회' })
  @ApiResponse({
    status: 200,
    description: '전체 유저 목록이 반환됩니다.',
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  // 특정 유저 조회 (GET /users/:id)
  @Get(':id')
  @ApiOperation({ summary: '특정 유저 조회' })
  @ApiResponse({
    status: 200,
    description: '특정 유저의 정보가 반환됩니다.',
    type: UserResponseDto,
  })
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOneById(Number(id));
  }

  // 특정 유저 정보 전체 수정 (PUT /users/:id)
  @Put(':id')
  @ApiOperation({ summary: '특정 유저 정보 전체 수정' })
  @ApiResponse({
    status: 200,
    description: '유저 정보가 성공적으로 수정되었습니다.',
    type: UserResponseDto,
  })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(Number(id), updateUserDto);
  }

  // 특정 유저 정보 일부 수정 (PATCH /users/:id)
  @Patch(':id')
  @ApiOperation({ summary: '특정 유저 정보 일부 수정' })
  @ApiResponse({
    status: 200,
    description: '유저 정보가 성공적으로 부분 수정되었습니다.',
    type: UserResponseDto,
  })
  async partialUpdateUser(
    @Param('id') id: string,
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.partialUpdate(Number(id), partialUpdateUserDto);
  }

  // 특정 유저 삭제 (DELETE /users/:id)
  @Delete(':id')
  @ApiOperation({ summary: '특정 유저 삭제' })
  @ApiResponse({
    status: 200,
    description: '유저가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '유저를 찾을 수 없습니다.',
  })
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.delete(Number(id));
  }
}
