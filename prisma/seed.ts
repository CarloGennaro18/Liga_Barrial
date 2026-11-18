import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const PERMISOS: { codigo: string; descripcion: string }[] = [
  // Campeonatos
  { codigo: 'campeonatos:leer', descripcion: 'Ver campeonatos' },
  { codigo: 'campeonatos:administrar', descripcion: 'Crear/editar/borrar campeonatos' },
  // Equipos
  { codigo: 'equipos:leer', descripcion: 'Ver equipos' },
  { codigo: 'equipos:administrar', descripcion: 'Crear/editar/borrar equipos e inscribirlos' },
  // Jugadores
  { codigo: 'jugadores:leer', descripcion: 'Ver jugadores' },
  { codigo: 'jugadores:administrar', descripcion: 'Crear/editar/borrar jugadores' },
  // Árbitros
  { codigo: 'arbitros:leer', descripcion: 'Ver árbitros' },
  { codigo: 'arbitros:administrar', descripcion: 'Crear/editar/borrar árbitros' },
  // Canchas
  { codigo: 'canchas:leer', descripcion: 'Ver canchas' },
  { codigo: 'canchas:administrar', descripcion: 'Crear/editar/borrar canchas' },
  // Partidos
  { codigo: 'partidos:leer', descripcion: 'Ver partidos' },
  { codigo: 'partidos:administrar', descripcion: 'Crear/editar/borrar partidos' },
  { codigo: 'resultados:registrar', descripcion: 'Registrar resultado de partidos' },
  // Tarjetas
  { codigo: 'tarjetas:leer', descripcion: 'Ver tarjetas' },
  { codigo: 'tarjetas:registrar', descripcion: 'Registrar tarjetas' },
  { codigo: 'tarjetas:administrar', descripcion: 'Editar/borrar tarjetas' },
  // Tabla
  { codigo: 'tabla:leer', descripcion: 'Ver tabla de posiciones' },
  // Usuarios
  { codigo: 'usuarios:administrar', descripcion: 'Gestionar usuarios del sistema' },
];

const ROLES: Record<string, string[]> = {
  ADMIN: PERMISOS.map((p) => p.codigo),
  ARBITRO: [
    'campeonatos:leer', 'equipos:leer', 'jugadores:leer',
    'arbitros:leer', 'canchas:leer', 'partidos:leer',
    'resultados:registrar',
    'tarjetas:leer', 'tarjetas:registrar',
    'tabla:leer',
  ],
  PUBLICO: PERMISOS.map((p) => p.codigo).filter((c) => c.endsWith(':leer')),
};

async function main() {
  console.log('🌱 Sembrando permisos...');
  for (const p of PERMISOS) {
    await prisma.permiso.upsert({
      where: { codigo: p.codigo },
      update: { descripcion: p.descripcion },
      create: p,
    });
  }

  console.log('🌱 Sembrando roles y asignando permisos...');
  for (const [nombre, codigos] of Object.entries(ROLES)) {
    const rol = await prisma.rol.upsert({
      where: { nombre },
      update: {},
      create: { nombre, descripcion: `Rol ${nombre}` },
    });

    for (const codigo of codigos) {
      const permiso = await prisma.permiso.findUnique({ where: { codigo } });
      if (!permiso) continue;
      await prisma.rolPermiso.upsert({
        where: { rolId_permisoId: { rolId: rol.id, permisoId: permiso.id } },
        update: {},
        create: { rolId: rol.id, permisoId: permiso.id },
      });
    }
  }

  console.log('🌱 Creando usuario ADMIN inicial...');
  const rolAdmin = await prisma.rol.findUnique({ where: { nombre: 'ADMIN' } });
  if (!rolAdmin) throw new Error('Rol ADMIN no encontrado');

  const hashAdmin = await argon2.hash('admin12345');
  await prisma.usuario.upsert({
    where: { email: 'admin@liga.com' },
    update: {},
    create: {
      email: 'admin@liga.com',
      password: hashAdmin,
      rolId: rolAdmin.id,
    },
  });

  console.log('✅ Seed completado');
  console.log('   Login admin: admin@liga.com / admin12345');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());