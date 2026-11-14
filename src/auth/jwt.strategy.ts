import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mi_super_secreto_123', // Usar .env
    });
  }

  async validate(payload: any) {
    // Lo que retorne aquí se inyecta en req.user
    return { id: payload.sub, email: payload.email, rol: payload.rol };
  }
}