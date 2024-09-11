import { Controller, Post, Body, NotFoundException, Param, Get, Put, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./create-user.dto";
import { User } from "../schemas/user.schema";
import { UpdateUserDto } from "./update-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "User successfully created", type: CreateUserDto })
  @ApiResponse({ status: 404, description: "User creation failed" })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new NotFoundException("error User create ");
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiParam({ name: "id", description: "ID of the user to retrieve" })
  @ApiResponse({ status: 200, description: "User successfully retrieved", type: CreateUserDto })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("id") id: string): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all users",
    type: [CreateUserDto],
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  @ApiParam({ name: "id", description: "ID of the user to update" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: "User successfully updated", type: UpdateUserDto })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Soft delete a user by ID" })
  @ApiParam({ name: "id", description: "ID of the user to delete" })
  @ApiResponse({ status: 200, description: "User successfully deleted", type: CreateUserDto })
  @ApiResponse({ status: 404, description: "User not found" })
  async softDelete(@Param("id") id: string): Promise<User> {
    try {
      return await this.usersService.softDelete(id);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
