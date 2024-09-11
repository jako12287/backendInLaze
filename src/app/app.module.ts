import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { MoviesModule } from "./favorites/favorite-movies.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://jako12287:johandev2022@cluster0.tku5o.mongodb.net/mydatabase?retryWrites=true&w=majority"),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60m" },
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
