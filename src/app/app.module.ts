import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://jako12287:johandev2022@cluster0.tku5o.mongodb.net/mydatabase?retryWrites=true&w=majority",
    ),
    JwtModule.register({
      secret: 'jako12287', 
      signOptions: { expiresIn: '60m' }, 
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

