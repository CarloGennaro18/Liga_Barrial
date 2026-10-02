import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query,
} from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { RegistrarResultadoDto } from './dto/registrar-resultado.dto';

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePartidoDto) {
    return this.partidosService.create(dto);
  }

  /** GET /partidos?campeonatoId=xxx */
  @Get()
  findAll(@Query('campeonatoId') campeonatoId?: string) {
    return campeonatoId
      ? this.partidosService.findByCampeonato(campeonatoId)
      : this.partidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartidoDto) {
    return this.partidosService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdatePartidoDto) {
    return this.partidosService.update(id, dto);
  }

  /** Sub-recurso: resultado del partido */
  @Put(':id/resultado')
  registrarResultado(
    @Param('id') id: string,
    @Body() dto: RegistrarResultadoDto,
  ) {
    return this.partidosService.registrarResultado(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.partidosService.remove(id);
  }
}