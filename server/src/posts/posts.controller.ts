// src/posts/posts.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Posts (게시글 관련 API)')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // GET 요청 시 게시글 목록 반환
  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  async getPosts() {
    return this.postsService.getPosts();
  }
}
