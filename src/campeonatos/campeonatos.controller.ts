import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { CampeonatosService } from './campeonatos.service';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Campeonatos')
@Controller('campeonatos')
export class CampeonatosController {
  constructor(private readonly campeonatosService: CampeonatosService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('campeonatos:administrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear campeonato (ADMIN)' })
  @ApiResponse({ status: 201, description: 'Creado' })
  @ApiResponse({ status: 401, description: 'Sin token' })
  @ApiResponse({ status: 403, description: 'Sin permiso' })
  create(@Body() dto: CreateCampeonatoDto) {
    return this.campeonatosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar campeonatos (público)' })
  findAll() {
    return this.campeonatosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener campeonato por id (público)' })
  findOne(@Param('id') id: string) {
    return this.campeonatosService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('campeonatos:administrar')
  @ApiOperation({ summary: 'Reemplazar campeonato (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdateCampeonatoDto) {
    return this.campeonatosService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('campeonatos:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateCampeonatoDto) {
    return this.campeonatosService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('campeonatos:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar campeonato (ADMIN)' })
  @ApiResponse({ status: 204, description: 'Eliminado' })
  remove(@Param('id') id: string) {
    return this.campeonatosService.remove(id);
  }
}