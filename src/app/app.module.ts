import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { MoviesModule } from "./favorites/favorite-movies.module";
import { ConfigModule } from '@nestjs/config';
import { env_develop } from 'env_develop';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(env_develop.MONGO_URI),
    JwtModule.register({
      secret: env_develop.JWT_SECRET!,
      signOptions: { expiresIn: "60m" },
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
