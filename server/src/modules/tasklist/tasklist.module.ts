import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListEntity } from 'src/entities/tasklist.entity';
import { TaskListController } from './tasklist.controller';
import { TaskListService } from './tasklist.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaskListEntity])],
    controllers: [TaskListController],
    providers: [TaskListService]
})

export class TaskListModule {}
