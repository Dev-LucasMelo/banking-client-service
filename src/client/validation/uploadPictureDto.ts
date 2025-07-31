import { IsNotEmpty, IsString } from "class-validator";

export class uploadPictureDto {
    @IsNotEmpty({ message: "O campo urlS3 não pode ser vazio" })
    @IsString({ message: "O campo urlS3 deve ser do tipo texto" })
    urlS3: string
}