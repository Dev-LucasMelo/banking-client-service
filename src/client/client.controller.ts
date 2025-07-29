import { Controller,Param,Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {

    constructor(
        private readonly service: ClientService
    ){}

    @Get(':id')
    async findById(@Param('id') id: string){
        return await this.service.findUniqueById(id);
    }
}
