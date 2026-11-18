import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, Query, Req, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiQuery, ApiTags,
} from '@nestjs/swagger';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { RegistrarResultadoDto } from './dto/registrar-resultado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Partidos')
@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('partidos:administrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear partido (ADMIN)' })
  create(@Body() dto: CreatePartidoDto) {
    return this.partidosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar partidos (público)' })
  @ApiQuery({ name: 'campeonatoId', required: false })
  findAll(@Query('campeonatoId') campeonatoId?: string) {
    return campeonatoId
      ? this.partidosService.findByCampeonato(campeonatoId)
      : this.partidosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener partido (público)' })
  findOne(@Param('id') id: string) {
    return this.partidosService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('partidos:administrar')
  @ApiOperation({ summary: 'Reemplazar partido (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdatePartidoDto) {
    return this.partidosService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('partidos:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdatePartidoDto) {
    return this.partidosService.update(id, dto);
  }

  @Put(':id/resultado')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('resultados:registrar')
  @ApiOperation({
    summary: 'Registrar resultado del partido (ADMIN o ARBITRO asignado)',
    description:
      'Aplica BOLA: un ARBITRO solo puede registrar resultados de sus propios partidos.',
  })
  registrarResultado(
    @Param('id') id: string,
    @Body() dto: RegistrarResultadoDto,
    @Req() req: any,
  ) {
    return this.partidosService.registrarResultado(id, dto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('partidos:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar partido (ADMIN)' })
  remove(@Param('id') id: string) {
    return this.partidosService.remove(id);
  }
}