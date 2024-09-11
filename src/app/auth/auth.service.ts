import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/create-user.dto";
import { LoginDto } from "./loginDto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const user = await this.usersService.create({
      ...createUserDto,
      password: createUserDto.password,
    });

    const token = this.jwtService.sign({ id: user._id, email: user.email });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const trimmedPassword = loginDto.password.trim();
    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials password incorrect");
    }

    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
