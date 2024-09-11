import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/create-user.dto";
import { LoginDto } from "./loginDto";
import { RevokedTokensService } from "./revoked-tokens.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly revokedTokensService: RevokedTokensService,
  ) {}

  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      await this.revokedTokensService.revokeToken(token);
    }
    res.status(200).send({ message: "Logged out successfully" });
  }
}
