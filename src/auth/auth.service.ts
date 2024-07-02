import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    if (existingUser) {
      throw new UnprocessableEntityException('User already exists');
    }

    const age = await (new Date().getFullYear() -
      new Date(createAuthDto.dob).getFullYear());

    return this.prismaService.user.create({
      data: {
        name: createAuthDto.name,
        email: createAuthDto.email,
        password: await this.hashPassword(createAuthDto.password),
        gender: createAuthDto.gender,
        age,
        dob: new Date(createAuthDto.dob),
        location: createAuthDto.location,
        occupation: createAuthDto.occupation,
      },
    });
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async login(user: User) {
    console.log(user);
    const { password, ...payload } = user;
    password;
    // const payload = {
    //   sub: user.id,
    //   email: user.email,
    //   fullName: user.fullName,
    // };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    const accessToken = this.jwtService.sign(payload);

    return {
      refreshToken,
      accessToken,
    };
  }

  async refresh(user: any) {
    const { hashedPassword, ...payload } = user;
    hashedPassword;
    // const payload = {
    //   sub: user.id,
    //   email: user.email,
    //   fullName: user.fullName,
    // };
    delete payload.iat;
    delete payload.exp;

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async convertToJwtToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
