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
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  /** CREAR PARTIDO: Solo el ADMIN puede crear partidos */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePartidoDto) {
    return this.partidosService.create(dto);
  }

  /** GET /partidos o /partidos?campeonatoId=xxx (Público / Abierto) */
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

  /** REGISTRAR RESULTADO: ADMIN o ARBITRO (Protegido por BOLA y Roles) */
  @Put(':id/resultado')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'ARBITRO')
  registrarResultado(
    @Param('id') id: string,
    @Body() dto: RegistrarResultadoDto,
    @Req() req: any, // Obtenemos el ID del usuario del token JWT
  ) {
    return this.partidosService.registrarResultado(id, dto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.partidosService.remove(id);
  }
}