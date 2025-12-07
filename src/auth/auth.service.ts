import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp({ email, name, password, phone }: SignUpDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email, phone },
    });

    if (existingUser) {
      return new BadRequestException('Email or phone already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
  }
}
