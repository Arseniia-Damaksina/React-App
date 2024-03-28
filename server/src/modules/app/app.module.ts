import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configurations from 'src/configurations';
import { TaskListModule } from '../tasklist/tasklist.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          // url: 'postgres://vrnvjsvv:WqM5Bj26wy-HRp4O0AaS8pcDUiJE3Lj3@cornelius.db.elephantsql.com/vrnvjsvv',
          // url: configService.get('db_url'),
          // url: 'postgres://db_user:tikbQtRvsYiaFW3oLhx70ky09CLsneRc@dpg-co2ino821fec73au2c5g-a/tasklists?sslmode=no-verify',
          url: 'postgres://db_user:tikbQtRvsYiaFW3oLhx70ky09CLsneRc@dpg-co2ino821fec73au2c5g-a.frankfurt-postgres.render.com/tasklists?sslmode=no-verify',
          // host: configService.get('db_host'),
          // port: configService.get('db_port'),
          // username: configService.get('db_user'),
          // password: configService.get('db_password'),
          // database: configService.get('db_name'),
          autoLoadEntities: true,
          entities: [TaskListModule, TaskModule],
          synchronize: true
        };
      },
    }),
    TaskListModule, TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
