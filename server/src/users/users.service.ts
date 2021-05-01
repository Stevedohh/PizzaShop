import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async create(user: CreateUserDto): Promise<UsersEntity> {
    return this.usersRepository.save(this.usersRepository.create({ ...user }));
  }

  async update(authorization, userDto: CreateUserDto) {
    const token = authorization.split(' ')[1];
    const id = this.jwtService.decode(token)['id'];

    const updatedUser = {
      ...userDto,
    };

    if (userDto.password) {
      updatedUser.password = await bcrypt.hash(userDto.password, 5);
    }

    return this.usersRepository.update({ id }, { ...updatedUser });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async getById(id) {
    return await this.usersRepository.findOne(id);
  }

  async get(authorization) {
    const token = authorization.split(' ')[1];
    const id = this.jwtService.decode(token)['id'];

    return await this.usersRepository.findOne(id);
  }
}
