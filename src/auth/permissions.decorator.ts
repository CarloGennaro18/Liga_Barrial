import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Etiqueta un endpoint con los permisos requeridos y weas requeridas.
 * Ej: @Permissions('equipos:administrar')
 */
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);