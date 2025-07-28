import { BadRequestException, Injectable, } from '@nestjs/common';
import { loginDto } from './validation/login.dto';
import { ClientService } from 'src/client/client.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly clientService: ClientService,
        private readonly jwtService: JwtService
    ) { }

    async login(data: loginDto) {
        try {
            const { email, password } = data
            let client = await this.clientService.findUnique(email)

            if (!client || password != client.senha) {
                throw new BadRequestException('Credenciais invalidas')
            }   

            const payload = {id: client.id, email: client.email, nome_cliente: client.nome_completo}

            return {
                token: await this.jwtService.signAsync(payload)
            }

        } catch (error) {
            throw new BadRequestException('Credenciais invalidas')
        }

    }
}
