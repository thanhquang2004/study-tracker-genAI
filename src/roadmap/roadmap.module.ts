import { Module } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './roadmap.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService, PrismaService],
})
export class RoadmapModule {}
