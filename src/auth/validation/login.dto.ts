import { IsDefined, IsNotEmpty, Length, IsEmail } from "class-validator"

export class loginDto {
    @IsDefined({ message: "O campo e-mail é obrigatório" })
    @IsNotEmpty({ message: "O campo e-mail não pode ser vazio" })
    @IsEmail({}, { message: 'O campo e-mail informado é inválido.' })
    email: string

    @Length(8, 10, { message: "O campo password deve conter entre 8 e 10 caracteres" })
    @IsDefined({ message: "O campo password é obrigatório" })
    @IsNotEmpty({ message: "O campo password não pode ser vazio" })
    password: string
}