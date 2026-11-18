import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, Query, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiQuery, ApiTags,
} from '@nestjs/swagger';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Tarjetas')
@Controller('tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('tarjetas:registrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar tarjeta (ADMIN o ARBITRO)' })
  create(@Body() dto: CreateTarjetaDto) {
    return this.tarjetasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tarjetas (público)' })
  @ApiQuery({ name: 'partidoId', required: false })
  @ApiQuery({ name: 'jugadorId', required: false })
  findAll(
    @Query('partidoId') partidoId?: string,
    @Query('jugadorId') jugadorId?: string,
  ) {
    if (partidoId) return this.tarjetasService.findByPartido(partidoId);
    if (jugadorId) return this.tarjetasService.findByJugador(jugadorId);
    return this.tarjetasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tarjeta (público)' })
  findOne(@Param('id') id: string) {
    return this.tarjetasService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('tarjetas:administrar')
  @ApiOperation({ summary: 'Reemplazar tarjeta (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdateTarjetaDto) {
    return this.tarjetasService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('tarjetas:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateTarjetaDto) {
    return this.tarjetasService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('tarjetas:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar tarjeta (ADMIN)' })
  remove(@Param('id') id: string) {
    return this.tarjetasService.remove(id);
  }
}