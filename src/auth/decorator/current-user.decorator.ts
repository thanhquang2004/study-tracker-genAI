import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest();
  console.log(request.user);
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
