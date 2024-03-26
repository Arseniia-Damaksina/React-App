import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskListEntity } from 'src/entities/tasklist.entity';
import { CreateTaskListDto } from 'src/DTOs/create-tasklist.dto';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskListEntity)
    private readonly taskListRepository: Repository<TaskListEntity>,
  ) {}

  async getAllTasklists(): Promise<TaskListEntity[]> {
    try {
      return await this.taskListRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch all task lists');
    }
  }

  async getOneTasklist(id: number): Promise<TaskListEntity> {
    try {
      return await this.taskListRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to fetch task list');
    }
  }

  async createTasklist(createTasklistDto: CreateTaskListDto): Promise<TaskListEntity> {
    try {
      const { title } = createTasklistDto;
    
      const newTasklist = this.taskListRepository.create({
        title
      });

      return await this.taskListRepository.save(newTasklist);
    } catch (error) {
      throw new Error('Failed to create task list');
    }
  }

  async updateTasklist(id: number, updateTasklistDto: CreateTaskListDto): Promise<TaskListEntity> {
    try {
      const tasklist = await this.getOneTasklist(id);
      tasklist.title = updateTasklistDto.title;
      return await this.taskListRepository.save(tasklist);
    } catch (error) {
      throw new Error('Failed to update task list');
    }
  }

  async deleteTasklist(id: number): Promise<string> {
    try {
      const tasklist = await this.getOneTasklist(id);
      await this.taskListRepository.remove(tasklist);
      return `Task list ${tasklist.title} has been successfully deleted.`;
    } catch (error) {
      throw new Error('Failed to delete task list');
    }
  }
}
