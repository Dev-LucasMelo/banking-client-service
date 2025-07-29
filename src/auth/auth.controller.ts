import { Controller, Post, Body } from '@nestjs/common';
import { loginDto } from './validation/login.dto';
import { AuthService } from './auth.service';
import { registerDto } from './validation/register.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/login')
    async login(@Body() data: loginDto) {
        return this.authService.login(data)
    }

    @Post("/register")
    async register(@Body() data: registerDto) {
        return this.authService.register(data)
    }

}
