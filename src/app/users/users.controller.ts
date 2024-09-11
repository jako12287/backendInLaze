import { Controller, Post, Body, NotFoundException, Param, Get, Put, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./create-user.dto";
import { User } from "../schemas/user.schema";
import { UpdateUserDto } from "./update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new NotFoundException("error User create ");
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  @Delete(":id")
  async softDelete(@Param("id") id: string): Promise<User> {
    try {
      return await this.usersService.softDelete(id);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
