import { BadRequestException, Injectable, } from '@nestjs/common';
import { loginDto } from './validation/login.dto';
import { ClientService } from 'src/client/client.service';
import { JwtService } from '@nestjs/jwt';
import { registerDto } from './validation/register.dto';
import * as bcrypt from 'bcrypt';

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

            if (!client || !await bcrypt.compare(password, client.senha)) {
                throw new BadRequestException('Credenciais invalidas')
            }

            const payload = { id: client.id, email: client.email, nome_cliente: client.nome_completo }

            return {
                token: await this.jwtService.signAsync(payload)
            }

        } catch (error) {
            throw new BadRequestException('Credenciais invalidas')
        }

    }

    async register(data: registerDto) {
        return await this.clientService.create(data)
    }
}
