import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { User } from "./schemas/user.schema";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Invalid user ID");
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }

    return updatedUser;
  }

  async softDelete(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Invalid user ID");
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.isDeleted = true;
    return user.save();
  }

  async toggleFavorite(userId: string, movieId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isFavorite = user.favorites?.includes(movieId);

    if (isFavorite) {
      user.favorites = user.favorites?.filter((id) => id !== movieId);
    } else {
      user.favorites?.push(movieId);
    }

    return user.save();
  }

  async getFavorites(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId).select("favorites");
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user.favorites || [];
  }
}
