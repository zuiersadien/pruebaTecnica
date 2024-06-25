import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const createdTask = await this.taskService.create(createTaskDto);
      return createdTask;
    } catch (error) {
      throw new HttpException(
        'No se pudo crear la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const tasks = await this.taskService.findAll();
      return tasks;
    } catch (error) {
      throw new HttpException(
        'No se pudo recuperar las tareas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const task = await this.taskService.findOne(+id);
      if (!task) {
        throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        'No se pudo recuperar la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.taskService.update(+id, updateTaskDto);
      return updatedTask;
    } catch (error) {
      throw new HttpException(
        'No se pudo actualizar la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleteResult = await this.taskService.remove(+id);
      console.log(deleteResult);
      return { success: true };
    } catch (error) {
      throw new HttpException(
        'No se pudo eliminar la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
