import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // 게시글 목록을 가져오는 메서드
  async getPosts() {
    try {
      const posts = await this.prisma.post.findMany(); // Prisma를 사용하여 데이터 조회
      console.log('하이요', posts); // 데이터 확인을 위해 콘솔 출력
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
}
