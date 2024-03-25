import { Controller, Get } from '@nestjs/common';
import { TaskListService } from './tasklist.service';


@Controller('tasklist')
export class TaskListController {
    constructor(private readonly taskListService: TaskListService) {}

    @Get()
        getAllTasklists(): string[] {
            return this.taskListService.getAllTasklists();
    }
}
