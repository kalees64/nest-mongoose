import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().select('-__v');
    return tasks;
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).select('-__v');

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async addTask(task: CreateTaskDto): Promise<Task> {
    const addTask = await this.taskModel.insertMany([task]);
    const newTask = addTask[0];
    return newTask;
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<Task> {
    if (Object.keys(task).length === 0) {
      throw new BadRequestException();
    }

    const findTask = this.getTask(id);

    const updateTask = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
    return updateTask;
  }

  async deleteTask(id: string): Promise<Task> {
    const findTask = this.getTask(id);
    const deletTask = await this.taskModel.findByIdAndDelete(id);
    return findTask;
  }
}
