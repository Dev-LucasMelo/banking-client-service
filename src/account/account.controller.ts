import { Body, Controller, Patch, Post } from '@nestjs/common';
import { debitBalanceDto } from './validation/debitBalance.Dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(
        private readonly service: AccountService
    ){}

    @Patch('/debit')
    async debitBalance(@Body() data: debitBalanceDto) {
        return await this.service.debit(data);
    }

}
