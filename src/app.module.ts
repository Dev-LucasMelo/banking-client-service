import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';

@Global()
@Module({
  imports: [AuthModule, PrismaModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
