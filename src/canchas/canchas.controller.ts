import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { CanchasService } from './canchas.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Canchas')
@Controller('canchas')
export class CanchasController {
  constructor(private readonly canchasService: CanchasService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('canchas:administrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear cancha (ADMIN)' })
  create(@Body() dto: CreateCanchaDto) {
    return this.canchasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar canchas (público)' })
  findAll() {
    return this.canchasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cancha (público)' })
  findOne(@Param('id') id: string) {
    return this.canchasService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('canchas:administrar')
  @ApiOperation({ summary: 'Reemplazar cancha (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdateCanchaDto) {
    return this.canchasService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('canchas:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateCanchaDto) {
    return this.canchasService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('canchas:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar cancha (ADMIN)' })
  remove(@Param('id') id: string) {
    this.canchasService.remove(id);
  }
}