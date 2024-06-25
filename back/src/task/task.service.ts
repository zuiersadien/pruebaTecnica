import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { descripcion, fechaHoraInicio } = createTaskDto;
    const newTask = this.taskRepository.create({
      descripcion,
      fechaHoraInicio: new Date(fechaHoraInicio),
      estado: false,
    });
    return await this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { descripcion, fechaHoraInicio } = updateTaskDto;
    const task = await this.findOne(id);
    task.descripcion = descripcion;
    task.fechaHoraInicio = new Date(fechaHoraInicio);

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
