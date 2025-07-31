import { IsNotEmpty, IsString } from "class-validator"

export class debitBalanceDto {
    @IsNotEmpty({ message: "O campo OriginClientAccount não pode ser vazio" })
    @IsString({ message: "O campo OriginClientAccount deve ser do tipo texto" })
    OriginClientAccount: string

    @IsNotEmpty({ message: "O campo targetClientBalance não pode ser vazio" })
    @IsString({ message: "O campo targetClientBalance deve ser do tipo texto" })
    targetClientBalance: string

    @IsNotEmpty({ message: "O campo amount não pode ser vazio" })
    @IsString({ message: "O campo amount deve ser do tipo texto" })
    amount: string
}