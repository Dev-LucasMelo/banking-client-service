import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {

    constructor(
        private readonly repository: PrismaService
    ) { }

    async findUnique(email: string) {
        return await this.repository.cliente.findFirstOrThrow({
            where: {
                email: email
            }
        })
    }
}
