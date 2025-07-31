import { Controller, Param, Get, Patch, BadRequestException, Body } from '@nestjs/common';
import { ClientService } from './client.service';
import { updateClientDto } from './validation/updateClientDto';
import { paramDto, bankingParamDto } from './validation/paramDto';

@Controller('client')
export class ClientController {

    constructor(
        private readonly service: ClientService
    ) { }

    @Get(':id')
    async findById(@Param() params: paramDto) {
        const { id } = params
        return await this.service.findUniqueById(id);
    }

    @Get('banking/:bankingAccountNumber/:bankingAgencyNumber')
    async findByBankingData(@Param() params: bankingParamDto) {
        return await this.service.findUniqueByBankingData(params);
    }


    @Patch(':id')
    async updateById(@Param() params: paramDto, @Body() data: updateClientDto) {
        const { id } = params;
        return await this.service.updateById(id, data);
    }
}
