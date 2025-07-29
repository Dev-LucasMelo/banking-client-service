import { BadRequestException, Injectable } from '@nestjs/common';
import { registerDto } from 'src/auth/validation/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

@Injectable()
export class ClientService {

    constructor(
        private readonly repository: PrismaService
    ) { }

    async findUnique(email: string) {
        return await this.repository.cliente.findFirst({
            where: {
                email: email
            }
        })
    }

    async create(data: registerDto) {
        const user = await this.findUnique(data.email);

        if (user) {
            throw new BadRequestException('O e-mail fornecido não está disponível.');
        }

        const hash = await bcrypt.hash(data.password, 10);

        return await this.repository.$transaction(async (trx) => {
            const cliente = await trx.cliente.create({
                data: {
                    nome_completo: data.name,
                    email: data.email,
                    senha: hash,
                    cpf: data.cpf,
                }
            })

            const conta = await trx.conta.create({
                data: {
                    cliente_id: cliente.id,
                    agencia: faker.finance.accountNumber(5),
                    numero_conta: faker.finance.accountNumber(8),
                    saldo: 0,
                    status: "ativo",
                    tipo: "corrente"
                }
            })

            return {
                cliente,
                conta,
            }
        })
    }
}
