import { IsUUID,IsDefined } from "class-validator";

export class paramDto {
    @IsUUID('4', { message: "O id fornecido está em um formato inválido!" })
    id: string
}

export class bankingParamDto {
    @IsDefined({message: "O parametro bankingAccountNumber é obrigatório"})
    bankingAccountNumber: string

    @IsDefined({message: "O parametro bankingAgencyNumber é obrigatório"})
    bankingAgencyNumber: string
}