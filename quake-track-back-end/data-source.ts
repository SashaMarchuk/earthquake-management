// import 'dotenv/config';
// import { DataSource } from 'typeorm';
// import * as dotenv from 'dotenv';
// import { ConfigModule, ConfigService } from '@nestjs/config';
//
// dotenv.config({ path: '../.env' });
//
// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: configService.get<string>('DB_HOST'),
//   port: configService.get<number>('DB_PORT'),
//   username: configService.get<string>('DB_USERNAME'),
//   password: configService.get<string>('DB_PASSWORD'),
//   database: configService.get<string>('DB_NAME'),
//   entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/src/migration/**/*.ts'],
//   synchronize: false,
// });
//
// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//   });
