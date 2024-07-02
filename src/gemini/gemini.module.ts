import { Module } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [GeminiController],
  providers: [GeminiService, ConfigService, PrismaService],
})
export class GeminiModule {}
