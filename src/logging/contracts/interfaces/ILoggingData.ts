import { HttpStatus } from '@nestjs/common';

export interface ILoggingData {
  duration: number;
  requestData: unknown;
  responseData: unknown;
  httpStatus: HttpStatus;
}
