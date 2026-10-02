export type PosicionJugador = 'portero' | 'defensa' | 'mediocampista' | 'delantero';

export class Jugador {
  id!: string;
  nombre!: string;
  numeroCamiseta!: number;
  posicion!: PosicionJugador;
  equipoId!: string;
}