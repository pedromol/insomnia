import { Module } from '@nestjs/common';
import { HealthService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Health } from './app.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthTask } from './app.cron';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthSchema } from './app.schema';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'oracle',
      connectString: process.env['ORACLE_CONNECT_STRING'],
      username: process.env['ORACLE_USERNAME'],
      password: process.env['ORACLE_PASSWORD'],
      sid: process.env['ORACLE_SID'],
      synchronize: true,
      logging: true,
      entities: [Health],
    }),
    MongooseModule.forRoot(process.env['MONGO_CONNECT_STRING']),
    MongooseModule.forFeature([{ name: 'Health', schema: HealthSchema }]),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Health]),
  ],
  providers: [HealthService, HealthTask],
  controllers: [AppController],
})
export class AppModule { }
