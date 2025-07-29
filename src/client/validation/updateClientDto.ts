import { IsEmail, IsNotEmpty, IsString, Length, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { enderecoDto } from './enderecoDTO';

export class updateClientDto {

    @IsNotEmpty({ message: "O campo name não pode ser vazio" })
    @IsString({ message: "O campo name deve ser do tipo texto" })
    @Length(3, 100, { message: "O campo name deve conter entre 11 e 20 caracteres" })
    name: string;

    @IsNotEmpty({ message: "O campo email não pode ser vazio" })
    @IsEmail({}, { message: "O email informado é inválido." })
    @Length(5, 30, { message: "O campo email deve conter entre 6 e 30 caracteres" })
    email: string;

    @IsDefined({ message: "É obrigatório definir os campos de endereço." })
    @IsNotEmptyObject({ nullable: false }, { message: 'O endereço não pode ser nulo ou vazio.' })
    @ValidateNested()
    @Type(() => enderecoDto)
    endereco: enderecoDto;

}