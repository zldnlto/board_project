import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // 게시글 생성 (POST /posts)
  async create(
    authorId: number,
    createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        category: createPostDto.category,
        authorId,
      },
    });
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  // 모든 게시글 조회 (GET /posts)
  async findAll(
    query: GetPostsDto,
  ): Promise<{ posts: PostResponseDto[]; total: number }> {
    const { page = 1, limit = 10, author, search } = query;
    const skip = (page - 1) * limit; // 페이지네이션 offset

    const whereCondition: any = {}; // 동적 where 조건 생성

    if (author) {
      whereCondition.authorId = author;
    }

    if (search) {
      whereCondition.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await this.prisma.post.count({ where: whereCondition });

    const posts = await this.prisma.post.findMany({
      where: whereCondition,
      include: {
        author: {
          select: { id: true, username: true, email: true, createdAt: true },
        },
      },
      take: limit, // 페이지당 게시글 개수
      skip, // 조회 시작 위치 (offset)
      orderBy: { createdAt: 'desc' }, // 최신 게시글 순
    });

    return { posts, total };
  }

  // 특정 게시글 조회 (GET /posts/:id)
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
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
  async remove(id: number): Promise<{
    message: string;
    deletedPost: Omit<PostResponseDto, 'author' | 'content'> & {
      deletedAt: Date;
    };
  }> {
    const deletedPost = await this.prisma.post.delete({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: '게시글이 성공적으로 삭제되었습니다.',
      deletedPost: {
        ...deletedPost,
        deletedAt: new Date(),
      },
    };
  }
}
