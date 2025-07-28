import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientModule } from 'src/client/client.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './local.strategy';


@Module({
  imports: [ClientModule, JwtModule.register({ secret: '244466666', signOptions: { expiresIn: '1h' } })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
