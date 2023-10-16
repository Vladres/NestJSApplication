import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        const duration = new Date().getTime() - startTime;
        const data: LoggingDataDto = {
          duration,
          requestData,
          responseData,
          httpStatus,
        };

        this.sendLoggingRequest(data);
      }),
    );
  }

  private async sendLoggingRequest(data: LoggingDataDto): Promise<void> {
    try {
      await axios.post(this.configService.get('LOGGING_URL'), data);
    } catch (error) {
      console.error('Error sending logging request');
    }
  }
}
