import { Injectable } from '@nestjs/common';
import { debitBalanceDto } from './validation/debitBalance.Dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {

    constructor(
        private readonly repository: PrismaService
    ) { }

    async debit(data: debitBalanceDto) {
        const { OriginClientAccount, amount, targetClientBalance } = data

        let amountTransfer = Number(amount)

        return await this.repository.$transaction(async (trx) => {

            const origin = await trx.conta.findFirstOrThrow({
                select: {
                    saldo: true
                },
                where: {
                    id: OriginClientAccount,
                }
            })

            const target = await trx.conta.findFirstOrThrow({
                select: {
                    saldo: true
                },
                where: {
                    id: targetClientBalance
                }
            })

            let currentAmountOrigin = Number(origin.saldo)
            let currentAmountTarget = Number(target.saldo)

            const originUpdated = await trx.conta.update({
                data: {
                    saldo: (currentAmountOrigin - amountTransfer),
                },
                where: {
                    id: OriginClientAccount,
                }
            })

            const targetUpdated = await trx.conta.update({
                data: {
                    saldo: (currentAmountTarget + amountTransfer)
                },
                where: {
                    id: targetClientBalance
                }
            })

            return {
                result: originUpdated,
                message: "Saldo atualizado com sucesso!"
            }

        })
    }
}
