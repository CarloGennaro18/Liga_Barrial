import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
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
    // Rate limiting: máximo 10 peticiones por minuto por IP (Error 429)
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    PrismaModule,
    AuthModule,
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