import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InscribirEquipoDto } from './dto/inscribir-equipo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Equipos')
@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('equipos:administrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear equipo (ADMIN)' })
  create(@Body() dto: CreateEquipoDto) {
    return this.equiposService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar equipos (público)' })
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener equipo (público)' })
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('equipos:administrar')
  @ApiOperation({ summary: 'Reemplazar equipo (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    return this.equiposService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('equipos:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    return this.equiposService.update(id, dto);
  }

  @Patch(':id/inscripcion')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('equipos:administrar')
  @ApiOperation({ summary: 'Inscribir equipo a un campeonato (ADMIN)' })
  inscribir(@Param('id') id: string, @Body() dto: InscribirEquipoDto) {
    return this.equiposService.inscribir(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('equipos:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar equipo (ADMIN)' })
  remove(@Param('id') id: string) {
    this.equiposService.remove(id);
  }
}