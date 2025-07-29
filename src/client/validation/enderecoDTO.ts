import { IsDefined, IsString, Length } from "class-validator";

export class enderecoDto {
    
    @IsDefined({ message: "É obrigatório definir o campo numero em endereco." })
    @IsString({ message: "O campo numero deve ser do tipo texto" })
    @Length(1, 10, { message: "O campo numero deve conter entre 1 e 10 caracteres" })
    numero: string;

    @IsDefined({ message: "É obrigatório definir o campo rua em endereco." })
    @IsString({ message: "O campo rua deve ser do tipo texto" })
    @Length(1, 40, { message: "O campo rua deve conter entre 1 e 40 caracteres" })
    rua: string;

    @IsDefined({ message: "É obrigatório definir o campo bairro em endereco." })
    @IsString({ message: "O campo bairro deve ser do tipo texto" })
    @Length(1, 30, { message: "O campo bairro deve conter entre 1 e 30 caracteres" })
    bairro: string;

    @IsDefined({ message: "É obrigatório definir o campo cidade em endereco." })
    @IsString({ message: "O campo cidade deve ser do tipo texto" })
    @Length(1, 20, { message: "O campo cidade deve conter entre 1 e 20 caracteres" })
    cidade: string;

    @IsDefined({ message: "É obrigatório definir o campo cep em endereco." })
    @IsString({ message: "O campo cep deve ser do tipo texto" })
    @Length(8, 10, { message: "O campo cep deve conter entre 8 e 20 caracteres" })
    cep: string;
}