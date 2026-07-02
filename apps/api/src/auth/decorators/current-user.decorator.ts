import type { Request } from 'express';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Profile } from '../../generated/prisma/client';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Profile => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: Profile }>();
    return request.user;
  }
);
