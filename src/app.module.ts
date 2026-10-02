import { Module } from '@nestjs/common';
import { CampeonatosModule } from './campeonatos/campeonatos.module';
import { EquiposModule } from './equipos/equipos.module';
import { JugadoresModule } from './jugadores/jugadores.module';
import { ArbitrosModule } from './arbitros/arbitros.module';
import { CanchasModule } from './canchas/canchas.module';
import { PartidosModule } from './partidos/partidos.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { TablaPosicionesModule } from './tabla-posiciones/tabla-posiciones.module';

@Module({
  imports: [
    CampeonatosModule,
    EquiposModule,
    JugadoresModule,
    ArbitrosModule,
    CanchasModule,
    PartidosModule,
    TarjetasModule,
    TablaPosicionesModule,
  ],
})
export class AppModule {}