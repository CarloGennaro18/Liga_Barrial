import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InscribirEquipoDto } from './dto/inscribir-equipo.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEquipoDto) {
    return this.equiposService.create(dto);
  }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    return this.equiposService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    return this.equiposService.update(id, dto);
  }

  /** Endpoint específico: inscribir un equipo a un campeonato */
  @Patch(':id/inscripcion')
  inscribir(@Param('id') id: string, @Body() dto: InscribirEquipoDto) {
    return this.equiposService.inscribir(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.equiposService.remove(id);
  }
}