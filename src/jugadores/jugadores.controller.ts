import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiQuery, ApiTags,
} from '@nestjs/swagger';
import { JugadoresService } from './jugadores.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Jugadores')
@Controller('jugadores')
export class JugadoresController {
  constructor(private readonly jugadoresService: JugadoresService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('jugadores:administrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear jugador (ADMIN)' })
  create(@Body() dto: CreateJugadorDto) {
    return this.jugadoresService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar jugadores (público)' })
  @ApiQuery({ name: 'equipoId', required: false })
  findAll(@Query('equipoId') equipoId?: string) {
    return equipoId
      ? this.jugadoresService.findByEquipo(equipoId)
      : this.jugadoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener jugador (público)' })
  findOne(@Param('id') id: string) {
    return this.jugadoresService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('jugadores:administrar')
  @ApiOperation({ summary: 'Reemplazar jugador (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdateJugadorDto) {
    return this.jugadoresService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('jugadores:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateJugadorDto) {
    return this.jugadoresService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('jugadores:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar jugador (ADMIN)' })
  remove(@Param('id') id: string) {
    this.jugadoresService.remove(id);
  }
}