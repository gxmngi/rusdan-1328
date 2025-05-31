import { ApiProperty } from "@nestjs/swagger";
//import { User } from "src/entities";

export class UserDto {
    @ApiProperty({ description: 'email', example: 'upskill@gmail.com' })
    email: string;
    @ApiProperty({ description: 'password', example: 'strongPassword123' })
    password: string;
    @ApiProperty({ description: 'first name', example: 'John' })
    firstName: string;
    @ApiProperty({ description: 'last name', example: 'Doe' })
    lastName: string;
}