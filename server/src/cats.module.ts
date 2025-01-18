import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController], // CatsController 등록
})
export class CatsModule {}
