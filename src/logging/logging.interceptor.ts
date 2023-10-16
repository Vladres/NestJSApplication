import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggingDataDto } from './dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const startTime = new Date().getTime();
    const { body: requestData } = context.switchToHttp().getRequest();
    const { statusCode: httpStatus } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((responseData: unknown) => {
        const data: LoggingDataDto = {
          duration: this.getDuration(startTime),
          requestData,
          responseData,
          httpStatus,
        };

        this.sendLoggingRequest(data);
      }),
      catchError((error) => {
        const data: LoggingDataDto = {
          duration: this.getDuration(startTime),
          requestData,
          responseData: error.message,
          httpStatus: error.status,
        };

        this.sendLoggingRequest(data);
        return of(error);
      }),
    );
  }

  private getDuration(startTime: number): number {
    return new Date().getTime() - startTime;
  }

  private async sendLoggingRequest(data: LoggingDataDto): Promise<void> {
    try {
      await axios.post(this.configService.get('LOGGING_URL'), data);
    } catch (error) {
      console.error('Error sending logging request');
    }
  }
}
