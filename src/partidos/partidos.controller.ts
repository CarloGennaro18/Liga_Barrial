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
  Req,
  UseGuards,
} from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { RegistrarResultadoDto } from './dto/registrar-resultado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  /** Sub-recurso: resultado del partido (Protegido por JwtAuthGuard y validación BOLA en el servicio) */
  @Put(':id/resultado')
  @UseGuards(JwtAuthGuard)
  registrarResultado(
    @Param('id') id: string,
    @Body() dto: RegistrarResultadoDto,
    @Req() req: any, // Obtenemos el usuario del token
  ) {
    return this.partidosService.registrarResultado(id, dto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.partidosService.remove(id);
  }
}