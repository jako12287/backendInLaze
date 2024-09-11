import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "Name of the user" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: "Email of the user" })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: "Password of the user" })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
