import request from 'supertest';
import { App } from 'supertest/types';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // PrismaService's real lifecycle hook loads Prisma 7's WASM query
    // compiler via a dynamic import(), which Jest's default CJS runtime
    // can't execute. This route doesn't touch the database, so a
    // no-op stand-in avoids that entirely rather than requiring
    // --experimental-vm-modules (and a broader ESM migration) just to
    // boot the module tree for a health check.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({ onModuleInit: jest.fn(), onModuleDestroy: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  it('/api/v1 (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1').expect(200).expect({
      name: 'Bearnance API',
      version: '0.1.0',
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
