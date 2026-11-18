import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TablaPosicionesService } from './tabla-posiciones.service';

@ApiTags('Tabla de posiciones')
@Controller('campeonatos/:campeonatoId/tabla-posiciones')
export class TablaPosicionesController {
  constructor(
    private readonly tablaPosicionesService: TablaPosicionesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Tabla de posiciones del campeonato (público)' })
  async obtener(@Param('campeonatoId') campeonatoId: string) {
    return this.tablaPosicionesService.calcular(campeonatoId);
  }
}