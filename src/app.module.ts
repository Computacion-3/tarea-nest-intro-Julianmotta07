import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { GamesModule } from './games/games.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

type SupportedDbTypes =
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mariadb'
  | 'mongodb'
  | 'oracle';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: (configService.get<SupportedDbTypes>('DB_TYPE') ?? 'postgres') as SupportedDbTypes,
        host: configService.get<string>('DB_HOST') ?? 'localhost',
        port: configService.get<number>('DB_PORT') ?? 5432,
        username: configService.get<string>('DB_USERNAME') ?? 'postgres',
        password: configService.get<string>('DB_PASSWORD') ?? 'postgres',
        database: configService.get<string>('DB_DATABASE') ?? 'test',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? true,
        dropSchema: true,
      }),
    }),

    UsersModule,
    RolesModule,
    PermissionsModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}