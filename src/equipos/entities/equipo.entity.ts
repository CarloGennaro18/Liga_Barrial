export class Equipo {
  id!: string;
  nombre!: string;
  representante!: string;
  telefono!: string;
  campeonatoId?: string | null; // null = registrado pero NO inscrito
  fechaInscripcion?: string | null;
}