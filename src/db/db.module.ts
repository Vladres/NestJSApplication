import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PG_CONNECTION } from './contracts';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PG_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        console.log({
          user: configService.get<string>('DB_USER'),
          host: configService.get<string>('DB_HOST'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT'),
        })
        return new Pool({
          user: configService.get<string>('DB_USER'),
          host: configService.get<string>('DB_HOST'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PG_CONNECTION],
})
export class DBModule {}
