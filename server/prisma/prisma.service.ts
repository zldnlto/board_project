import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    // 모든 쿼리에 대한 로깅 미들웨어
    this.$use(async (params, next) => {
      console.log(`✨실행: ${params.model}.${params.action}`);
      return next(params);
    });
  }

  // 모듈이 초기화될 때 DB 연결
  async onModuleInit() {
    await this.$connect();
  }

  // 모듈이 종료될 때 DB 연결 해제
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
