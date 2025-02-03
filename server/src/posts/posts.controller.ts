// src/posts/posts.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // GET 요청 시 게시글 목록 반환
  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }
}
