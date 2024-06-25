import { IsNotEmpty, IsString, IsDate, IsDateString } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsDateString()
  fechaHoraInicio: string;
}
