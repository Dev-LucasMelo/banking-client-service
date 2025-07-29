import { IsUUID } from "class-validator";

export class paramDto {
    @IsUUID('4', { message: "O id fornecido está em um formato inválido!" })
    id: string
}