import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EarthquakeModule } from './earthquake/earthquake.module';
import { Seeder } from './seeder/seed';
import { Earthquake } from './earthquake/entities/earthquake.entity';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Earthquake],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    EarthquakeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/graphql',
    }),
  ],
  providers: [Seeder],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seeder: Seeder) {}

  async onModuleInit() {
    // await this.seeder.seedDatabase();
    // Second way to init data inside DB
  }
}
