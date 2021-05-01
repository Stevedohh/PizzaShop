import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: UsersEntity) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getByEmail(userDto.email);
    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && isPasswordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Wrong password or email' });
  }

  async createUser(userDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    return { ...userDto, password: hashedPassword };
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const newUser = await this.createUser(userDto);
    const user = await this.userService.create({
      ...newUser,
    });

    return this.generateToken(user);
  }
}
