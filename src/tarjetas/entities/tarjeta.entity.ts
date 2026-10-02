export type TipoTarjeta = 'amarilla' | 'roja';

export class Tarjeta {
  id!: string;
  partidoId!: string;
  jugadorId!: string;
  tipo!: TipoTarjeta;
  minuto!: number;
  motivo!: string;
}