import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
