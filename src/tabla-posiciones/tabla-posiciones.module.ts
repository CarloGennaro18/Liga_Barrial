import { Module } from '@nestjs/common';
import { TablaPosicionesController } from './tabla-posiciones.controller';
import { TablaPosicionesService } from './tabla-posiciones.service';
import { EquiposModule } from '../equipos/equipos.module';
import { PartidosModule } from '../partidos/partidos.module';

@Module({
  imports: [EquiposModule, PartidosModule],
  controllers: [TablaPosicionesController],
  providers: [TablaPosicionesService],
})
export class TablaPosicionesModule {}