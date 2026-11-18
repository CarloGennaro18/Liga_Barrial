import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Put, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { ArbitrosService } from './arbitros.service';
import { CreateArbitroDto } from './dto/create-arbitro.dto';
import { UpdateArbitroDto } from './dto/update-arbitro.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@ApiTags('Arbitros')
@Controller('arbitros')
export class ArbitrosController {
  constructor(private readonly arbitrosService: ArbitrosService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('arbitros:administrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear árbitro (ADMIN)' })
  create(@Body() dto: CreateArbitroDto) {
    return this.arbitrosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar árbitros (público)' })
  findAll() {
    return this.arbitrosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener árbitro (público)' })
  findOne(@Param('id') id: string) {
    return this.arbitrosService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('arbitros:administrar')
  @ApiOperation({ summary: 'Reemplazar árbitro (ADMIN)' })
  update(@Param('id') id: string, @Body() dto: UpdateArbitroDto) {
    return this.arbitrosService.update(id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('arbitros:administrar')
  @ApiOperation({ summary: 'Actualización parcial (ADMIN)' })
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateArbitroDto) {
    return this.arbitrosService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('arbitros:administrar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar árbitro (ADMIN)' })
  remove(@Param('id') id: string) {
    this.arbitrosService.remove(id);
  }
}