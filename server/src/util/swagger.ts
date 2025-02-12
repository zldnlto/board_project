import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

// const config = new DocumentBuilder()
//   .setTitle('게시판 API')
//   .setDescription('게시판 프로젝트의 API 문서입니다.')
//   .setVersion('1.0')
//   // .addBearerAuth()
//   .build(); // JWT인증추가(추후)
