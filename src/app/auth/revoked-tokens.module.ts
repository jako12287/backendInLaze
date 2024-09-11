import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevokedTokenSchema } from './schemas/auth.schema';
import { RevokedTokensService } from './revoked-tokens.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RevokedToken', schema: RevokedTokenSchema }]),
  ],
  providers: [RevokedTokensService],
  exports: [RevokedTokensService],
})
export class RevokedTokensModule {}
