import { Module } from '@nestjs/common';
import { TarjetasController } from './tarjetas.controller';
import { TarjetasService } from './tarjetas.service';
import { PartidosModule } from '../partidos/partidos.module';
import { JugadoresModule } from '../jugadores/jugadores.module';

@Module({
  imports: [PartidosModule, JugadoresModule], // para inyectar sus services
  controllers: [TarjetasController],
  providers: [TarjetasService],
  exports: [TarjetasService],
})
export class TarjetasModule {}