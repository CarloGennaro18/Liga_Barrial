import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermissionsGuard } from './permissions.guard';

// JWT_EXPIRES_IN viene de una env var.
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '1d') as `${number}${'s' | 'm' | 'h' | 'd'}`;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mi_super_secreto_123',
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PermissionsGuard],
  exports: [AuthService, JwtAuthGuard, PermissionsGuard],
})
export class AuthModule {}