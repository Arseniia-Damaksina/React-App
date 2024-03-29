import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { CreateTaskDto } from 'src/DTOs/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      return await this.taskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.taskList', 'taskList') 
      .select([
        'task.id',
        'task.name',
        'task.description',
        'task.dueDate',
        'task.priority',
        'task.taskListId',
        'taskList.title'
      ])
      .getMany();
    } catch (error) {
      throw new Error('Failed to fetch all tasks');
    }
  }

  async getOneTask(id: number): Promise<TaskEntity> {
    try {
      return await this.taskRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to fetch task');
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const { name, description, dueDate, priority, taskListId } = createTaskDto;
    
      const newTask = this.taskRepository.create({
        name,
        description,
        dueDate,
        priority,
        taskListId
      });

      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new Error('Failed to create task');
    }
  }

  async updateTask(id: number, updateTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const task = await this.getOneTask(id);
      if (!task) {
        throw new Error('Task not found');
      }

      const { name, description, dueDate, priority, taskListId } = updateTaskDto;
      task.name = name;
      task.description = description;
      task.dueDate = dueDate;
      task.priority = priority;
      task.taskListId = taskListId;

      return await this.taskRepository.save(task);
    } catch (error) {
      throw new Error('Failed to update task');
    }
  }

  async deleteTask(id: number): Promise<string> {
    try {
      const task = await this.getOneTask(id);
      await this.taskRepository.remove(task);
      return `Task ${task.name} has been successfully deleted.`;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
}
