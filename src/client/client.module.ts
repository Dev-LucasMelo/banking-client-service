import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientController } from './client.controller';

@Module({
  imports: [PrismaModule],
  providers: [ClientService],
  exports: [ClientService],
  controllers: [ClientController]
})
export class ClientModule { }
