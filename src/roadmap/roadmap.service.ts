import { Injectable } from '@nestjs/common';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class RoadmapService {
  constructor(private prismaService: PrismaService) {}

  findAllByUser(user: User) {
    return this.prismaService.roadmap.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.roadmap.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRoadmapDto: UpdateRoadmapDto) {
    return `This action updates a #${id} roadmap`;
  }

  remove(id: number) {
    return `This action removes a #${id} roadmap`;
  }
}
