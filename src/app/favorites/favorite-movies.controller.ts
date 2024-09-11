import {
  Controller,
  Post,
  Get,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "../users/users.service";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("movies")
@Controller("movies")
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly usersService: UsersService) {}

  @Post(":id/favorite")
  @ApiOperation({ summary: "Toggle the favorite status of a movie" })
  @ApiParam({ name: "id", description: "ID of the movie to toggle favorite status" })
  @ApiResponse({ status: 200, description: "Successfully toggled favorite status" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async toggleFavorite(@Param("id") movieId: string, @Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException("Unauthorized");
    }
    const userId = req.user.userId;
    return this.usersService.toggleFavorite(userId, movieId);
  }

  @Get("favorites")
  @ApiOperation({ summary: "Get a list of favorite movies for the current user" })
  @ApiResponse({ status: 200, description: "Successfully retrieved favorite movies" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getFavorites(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException("Unauthorized");
    }
    const userId = req.user.userId;
    return this.usersService.getFavorites(userId);
  }
}
