import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Post()
  async addTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.addTask(task);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
