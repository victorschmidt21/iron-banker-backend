import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'bcrypt';
import { signInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async signIn({ email, password }: signInDto) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return new UnauthorizedException('Email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new UnauthorizedException('Email or password is incorrect');
    }

    const payload = { sub: user.id, email: user.email };

    return { acessToken: this.jwtService.sign(payload) };
  }
}
