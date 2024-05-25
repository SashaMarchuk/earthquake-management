import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Earthquake } from './earthquake/entities/earthquake.entity';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [Earthquake],
  migrations: ['dist/migration/*.js'],
  synchronize: false,
});
