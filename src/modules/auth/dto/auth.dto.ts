import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthDto {
    
    @IsEmail(undefined, { message: 'Invalid Email' })
    email: string
    
    @IsNotEmpty({ message: 'Invalid Password' })
    password: string

}
