import { Module } from '@nestjs/common';
import { CampeonatosController } from './campeonatos.controller';
import { CampeonatosService } from './campeonatos.service';

@Module({
  controllers: [CampeonatosController],
  providers: [CampeonatosService],
  exports: [CampeonatosService], // exportamos para que otros módulos lo inyecten
})
export class CampeonatosModule {}