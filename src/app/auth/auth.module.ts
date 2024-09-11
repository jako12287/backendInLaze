import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { RevokedTokensModule } from "./revoked-tokens.module"; 
import { JwtStrategy } from "./jwt.strategy";
import { env_develop } from "env_develop";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.register({
      secret: env_develop.JWT_SECRET, 
      signOptions: { expiresIn: "1h" }, 
    }),
    RevokedTokensModule,  
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
