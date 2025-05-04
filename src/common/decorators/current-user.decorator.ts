import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  role: string;
}

interface RequestWithUser {
  user: JwtPayload;
}

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
