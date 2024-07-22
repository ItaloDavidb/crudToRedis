import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'The email of the user',
      })
    @IsEmail(undefined, { message: 'Invalid Email' })
    email: string
    
    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
      })
    @IsNotEmpty({ message: 'Invalid Password' })
    password: string

}
