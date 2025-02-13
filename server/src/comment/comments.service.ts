import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  // 댓글 작성
  async create(
    authorId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        authorId,
        postId,
      },
    });

    return {
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }

  // 특정 게시글의 모든 댓글 조회
  async findAllByPost(postId: number): Promise<CommentResponseDto[]> {
    return this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' }, // 오래된 댓글부터 정렬
    });
  }

  // 특정 댓글 조회
  async findOne(id: number): Promise<CommentResponseDto> {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`🚫 댓글 ID ${id}을 찾을 수 없습니다.`);
    }

    return {
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      postId: comment.postId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }

  // 댓글 수정
  async update(
    id: number,
    authorId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponseDto> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`🚫 댓글 ID ${id}을 찾을 수 없습니다.`);
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException(`🚫 본인의 댓글만 수정할 수 있습니다.`);
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: {
        content: updateCommentDto.content,
      },
    });

    return {
      id: updatedComment.id,
      content: updatedComment.content,
      authorId: updatedComment.authorId,
      postId: updatedComment.postId,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt,
    };
  }

  // ✅ 댓글 삭제
  async remove(id: number, authorId: number): Promise<{ message: string }> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`🚫 댓글 ID ${id}을 찾을 수 없습니다.`);
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException(`🚫 본인의 댓글만 삭제할 수 있습니다.`);
    }

    await this.prisma.comment.delete({ where: { id } });

    return { message: '댓글이 성공적으로 삭제되었습니다.' };
  }
}
