import { Controller, Post, Get, Param, Req, UseGuards, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "../users/users.service";

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
    constructor(private readonly usersService: UsersService) { }

    @Post(':id/favorite')
    async toggleFavorite(@Param('id') movieId: string, @Req() req: Request) {
        if(!req.user){
            throw new UnauthorizedException('Unauthorized');
        }
        const userId = req.user.userId;
        return this.usersService.toggleFavorite(userId, movieId);
    }

    @Get('favorites')
    async getFavorites(@Req() req: Request) {
        if(!req.user){
            throw new UnauthorizedException('Unauthorized');
        }
        const userId = req.user.userId;
        return this.usersService.getFavorites(userId);
    }
}