import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/create-user.dto";
import { LoginDto } from "./loginDto";
import { RevokedTokensService } from "./revoked-tokens.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly revokedTokensService: RevokedTokensService,
  ) {}

  @Post("signup")
  @ApiOperation({ summary: "Sign up a new user" })
  @ApiBody({ type: CreateUserDto }) // Document the request body
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Log in a user and return a JWT token" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "JWT token returned successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("logout")
  @ApiOperation({ summary: "Log out a user by revoking the JWT token" })
  @ApiResponse({ status: 200, description: "Logged out successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      await this.revokedTokensService.revokeToken(token);
    }
    res.status(200).send({ message: "Logged out successfully" });
  }
}
