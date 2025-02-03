import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
