import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query,
} from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateJugadorDto) {
    return this.jugadoresService.create(dto);
  }

  /** GET /jugadores?equipoId=xxx  → filtra por equipo (query param) */
  @Get()
  findAll(@Query('equipoId') equipoId?: string) {
    return equipoId
      ? this.jugadoresService.findByEquipo(equipoId)
      : this.jugadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jugadoresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJugadorDto) {
    return this.jugadoresService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateJugadorDto) {
    return this.jugadoresService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.jugadoresService.remove(id);
  }
}