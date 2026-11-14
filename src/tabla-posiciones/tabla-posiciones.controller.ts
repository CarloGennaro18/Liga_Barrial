import { Controller, Get, Param } from '@nestjs/common';
import { TablaPosicionesService } from './tabla-posiciones.service';

@Controller('campeonatos/:campeonatoId/tabla-posiciones')
export class TablaPosicionesController {
  constructor(
    private readonly tablaPosicionesService: TablaPosicionesService,
  ) {}

  /** Relación jerárquica: la tabla pertenece a un campeonato */
  @Get()
  async obtener(@Param('campeonatoId') campeonatoId: string) {
    return await this.tablaPosicionesService.calcular(campeonatoId);
  }
}