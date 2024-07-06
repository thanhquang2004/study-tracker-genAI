import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getMe(user: User) {
    const { password, ...result } = user;
    password;
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    const { ...result } = user;
    delete result.password;
    return result;
  }
}
