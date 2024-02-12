import { HttpException, HttpStatus } from '@nestjs/common';

export const errorHandlingService = (
  error: Error | HttpException,
  code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): never => {
  const status = code
    ? code
    : error instanceof HttpException
      ? error.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

  throw new HttpException(
    {
      status,
      error: error,
      message: error.message || 'Internal server error',
    },
    status,
  );
};
