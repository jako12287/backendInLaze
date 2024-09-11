import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { RevokedTokensModule } from "./revoked-tokens.module"; 

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "jako12287", 
      signOptions: { expiresIn: "1h" }, 
    }),
    RevokedTokensModule,  
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
