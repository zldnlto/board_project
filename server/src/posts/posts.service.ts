import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // 게시글 생성 (POST /posts)
  async create(authorId: number, createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        category: createPostDto.category,
        authorId,
      },
    });
  }

  // 모든 게시글 조회 (GET /posts)
  async findAll() {
    return this.prisma.post.findMany({
      include: { author: true }, // 작성자 정보 포함
    });
  }

  // 특정 게시글 조회 (GET /posts/:id)
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) {
      throw new NotFoundException(`🚫 게시글 ID ${id}을 찾을 수 없습니다.`);
    }
    return post;
  }

  // 게시글 수정 (PATCH /posts/:id)
  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  // 게시글 삭제 (DELETE /posts/:id)
  async remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
