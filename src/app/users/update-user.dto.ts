import { IsOptional, IsString, IsEmail, MinLength } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly name?: string;

  @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
