import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoggingData } from './contracts';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const startTime = new Date().getTime();

    return next.handle().pipe(
      tap(() => {
        const requestDuration = new Date().getTime() - startTime;
        const { body: requestData } = context.switchToHttp().getRequest();
        const { body: responseData, statusCode: httpStatus } = context
          .switchToHttp()
          .getResponse();

        console.log(responseData);
        this.sendLoggingRequest({
          duration: requestDuration,
          requestData,
          responseData,
          httpStatus,
        });
      }),
    );
  }

  private async sendLoggingRequest(data: ILoggingData) {
    try {
      // await axios.post('http://localhost:3000/logging', data);
      console.log(data);
    } catch (error) {
      console.error('Error sending logging request:', error);
    }
  }
}
