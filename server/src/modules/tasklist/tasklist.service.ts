import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskListService {
  getAllTasklists(): string[] {
    return ['list1', 'list2'];
  }
}
