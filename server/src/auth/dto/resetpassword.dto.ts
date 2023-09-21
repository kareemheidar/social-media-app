import { IsString, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    password: string;

}