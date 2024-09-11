import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RevokedToken } from '../schemas/auth.schema';

@Injectable()
export class RevokedTokensService {
  constructor(@InjectModel('RevokedToken') private readonly revokedTokenModel: Model<RevokedToken>) {}

  async revokeToken(token: string): Promise<void> {
    await new this.revokedTokenModel({ token }).save();
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = await this.revokedTokenModel.findOne({ token }).exec();
    return !!revokedToken;
  }
}
