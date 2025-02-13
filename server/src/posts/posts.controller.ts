import { UserResponseDto } from '@/user/dto/user-response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 게시글 작성 (POST /posts)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 작성되었습니다.',
    type: PostResponseDto,
  })
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const user = req.user as UserResponseDto;
    return this.postsService.create(user.id, createPostDto);
  }

  // 모든 게시글 조회 (GET /posts)
  @Get()
  @ApiOperation({ summary: '모든 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '모든 게시글 목록을 가져옵니다.',
    type: [PostResponseDto],
  })
  async findAll() {
    return this.postsService.findAll();
  }

  // 특정 게시글 조회 (GET /posts/:id)
  @Get(':id')
  @ApiOperation({ summary: '특정 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '특정 게시글을 가져옵니다.',
    type: PostResponseDto,
  })
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  // 게시글 수정 (PATCH /posts/:id)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({
    status: 200,
    description: '게시글이 성공적으로 수정되었습니다.',
    type: PostResponseDto,
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(Number(id), updatePostDto);
  }

  // 게시글 삭제 (DELETE /posts/:id)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({
    status: 200,
    description: '게시글이 성공적으로 삭제되었습니다.',
    schema: {
      example: {
        message: '게시글이 성공적으로 삭제되었습니다.',
        deletedPost: {
          id: 1,
          title: '강철부대 박보람 48초 저격 보셨어여??',
          category: '자유',
          authorId: 14,
          createdAt: '2025-02-13T14:26:13.291Z',
          updatedAt: '2025-02-13T14:26:13.291Z',
          deletedAt: '2025-02-14T10:30:00.000Z',
        },
      },
    },
  })
  async remove(@Param('id') id: string) {
    return this.postsService.remove(Number(id));
  }
}
