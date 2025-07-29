import { IsNotEmpty, Length, IsEmail, IsString } from "class-validator"

export class registerDto {
    @IsNotEmpty({ message: "O campo name não pode ser vazio" })
    @IsString({ message: "O campo name deve ser do tipo texto" })
    @Length(3, 100, { message: "O campo name deve conter entre 11 e 20 caracteres" })
    name: string;

    @IsNotEmpty({ message: "O campo cpf não pode ser vazio" })
    @IsString({ message: "O campo cpf deve ser do tipo texto" })
    @Length(11, 20, { message: "O campo cpf deve conter entre 11 e 20 caracteres" })
    cpf: string;

    @IsNotEmpty({ message: "O campo email não pode ser vazio" })
    @IsEmail({}, { message: "O email informado é inválido." })
    @Length(5, 30, { message: "O campo email deve conter entre 6 e 30 caracteres" })
    email: string;

    @IsNotEmpty({ message: "O campo password não pode ser vazio" })
    @IsString({ message: "O campo password deve ser do tipo texto" })
    @Length(8, 30, { message: "O campo password deve conter entre 8 e 30 caracteres" })
    password: string;
}