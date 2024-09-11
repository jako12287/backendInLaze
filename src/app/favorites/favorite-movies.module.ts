import { Module } from '@nestjs/common';
import { MoviesController } from './favorite-movies.controller';
import { UsersService } from '../users/users.service'; 
import { MongooseModule } from '@nestjs/mongoose'; 
import { UserSchema } from '../schemas/user.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
  ],
  controllers: [MoviesController], 
  providers: [UsersService], 
})
export class MoviesModule {}
