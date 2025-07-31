import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { registerDto } from 'src/auth/validation/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { updateClientDto } from './validation/updateClientDto';
import { bankingParamDto } from './validation/paramDto';

@Injectable()
export class ClientService {

    constructor(
        private readonly repository: PrismaService
    ) { }

    async findUniqueByEmail(email: string) {
        return await this.repository.cliente.findFirst({
            where: {
                email: email
            }
        })
    }

    async findUniqueById(id: string) {
        return await this.repository.cliente.findFirstOrThrow({
            where: {
                id: id
            },
            select: {
                id: true,
                nome_completo: true,
                email: true,
                url_perfil: true,
                Conta: {
                    select: {
                        id: true,
                        numero_conta: true,
                        agencia: true,
                        saldo: true
                    }
                },
                Endereco: {
                    select: {
                        cep: true,
                        cidade: true,
                        bairro: true,
                        rua: true
                    }
                }
            },
        }).then((response) => {
            return {
                message: "Cliente encontrado com sucesso !",
                result: response
            }
        }).catch((err) => {
            throw new BadRequestException("Ocorreu um erro inesperado!")
        })
    }

    async findUniqueByBankingData(data: bankingParamDto) {
        const client = await this.repository.conta.findFirst({
            select: {
                cliente: {
                    select: {
                        id: true,
                        nome_completo: true,
                        email: true,
                        Conta: {
                            select: {
                                id: true,
                                numero_conta: true,
                                agencia: true,
                                saldo: true,
                            }
                        }
                    }
                }
            },
            where: {
                numero_conta: data.bankingAccountNumber,
                agencia: data.bankingAgencyNumber
            },
        })

        if (!client) {
            throw new NotFoundException("Cliente não encontrado !");
        }

        return client
    }

    async create(data: registerDto) {
        const client = await this.findUniqueByEmail(data.email);

        if (client) {
            throw new BadRequestException('O e-mail fornecido não está disponível.');
        }

        const hash = await bcrypt.hash(data.password, 10);

        return await this.repository.$transaction(async (trx) => {
            const client = await trx.cliente.create({
                data: {
                    nome_completo: data.name,
                    email: data.email,
                    senha: hash,
                    cpf: data.cpf,
                }
            })

            const account = await trx.conta.create({
                data: {
                    cliente_id: client.id,
                    agencia: faker.finance.accountNumber(5),
                    numero_conta: faker.finance.accountNumber(8),
                    saldo: 0,
                    status: "ativo",
                    tipo: "corrente"
                }
            })

            return {
                message: "Cliente registrado com sucesso !",
                result: {
                    client,
                    account,
                }
            }
        })
    }

    async updateById(id: string, data: updateClientDto) {
        const { endereco, email, name } = data

        return await this.repository.$transaction(async (trx) => {

            const targetClient = await trx.cliente.findFirst({
                where: {
                    id: id
                }
            })

            const emailExists = await trx.cliente.findFirst({
                where: {
                    email: email
                }
            })

            if (!targetClient) {
                throw new NotFoundException("Cliente não encontrado!");
            }

            if (emailExists && targetClient.email != email) {
                throw new BadRequestException("O e-mail informado é inválido!");
            }

            const client = await trx.cliente.update({
                where: {
                    id: id,
                },
                data: {
                    nome_completo: name,
                    email: email
                }
            })

            const address = await trx.endereco.upsert({
                where: {
                    cliente_id: client.id
                },
                update: endereco,
                create: {
                    rua: endereco.rua,
                    bairro: endereco.bairro,
                    cep: endereco.cep,
                    cidade: endereco.cidade,
                    numero: endereco.numero,
                    status: "ativo",
                    cliente_id: client.id
                }
            })

            return {
                message: "Dados atualizados com sucesso!",
                result: {
                    client,
                    address,
                }
            }

        })

    }
}
