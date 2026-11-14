import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TarjetasService } from './tarjetas.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tarjetas')
export class TarjetasController {
  constructor(private readonly tarjetasService: TarjetasService) {}

  /** CREAR TARJETA: Solo permitido para ADMIN o ARBITRO */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'ARBITRO')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTarjetaDto) {
    return this.tarjetasService.create(dto);
  }

  /** GET /tarjetas?partidoId=xxx  |  GET /tarjetas?jugadorId=xxx */
  @Get()
  findAll(
    @Query('partidoId') partidoId?: string,
    @Query('jugadorId') jugadorId?: string,
  ) {
    if (partidoId) return this.tarjetasService.findByPartido(partidoId);
    if (jugadorId) return this.tarjetasService.findByJugador(jugadorId);
    return this.tarjetasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarjetasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTarjetaDto) {
    return this.tarjetasService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateTarjetaDto) {
    return this.tarjetasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.tarjetasService.remove(id);
  }
}