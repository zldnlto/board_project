import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // ✅ 댓글 작성 (POST /comments/:postId)
  @Post(':postId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 작성' })
  @ApiResponse({
    status: 201,
    description: '댓글이 성공적으로 작성되었습니다.',
    type: CommentResponseDto,
  })
  async create(
    @Param('postId') postId: string,
    @Request() req,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    return this.commentService.create(
      req.user.id,
      Number(postId),
      createCommentDto,
    );
  }

  // ✅ 특정 게시글의 댓글 조회 (GET /comments?postId=10)
  @Get()
  @ApiOperation({ summary: '특정 게시글의 모든 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '게시글의 모든 댓글 목록',
    type: [CommentResponseDto],
  })
  async findAllByPost(
    @Query('postId') postId: string,
  ): Promise<CommentResponseDto[]> {
    return this.commentService.findAllByPost(Number(postId));
  }

  // ✅ 특정 댓글 조회 (GET /comments/:id)
  @Get(':id')
  @ApiOperation({ summary: '특정 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '특정 댓글의 상세 정보',
    type: CommentResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<CommentResponseDto> {
    return this.commentService.findOne(Number(id));
  }

  // ✅ 댓글 수정 (PATCH /comments/:id)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({
    status: 200,
    description: '댓글이 성공적으로 수정되었습니다.',
    type: CommentResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponseDto> {
    return this.commentService.update(
      Number(id),
      req.user.id,
      updateCommentDto,
    );
  }

  // ✅ 댓글 삭제 (DELETE /comments/:id)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({
    status: 200,
    description: '댓글이 성공적으로 삭제되었습니다.',
    schema: {
      example: { message: '댓글이 성공적으로 삭제되었습니다.' },
    },
  })
  async remove(@Param('id') id: string, @Request() req) {
    return this.commentService.remove(Number(id), req.user.id);
  }
}
