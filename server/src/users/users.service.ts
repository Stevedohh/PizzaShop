import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UsersEntity> {
    return this.usersRepository.save(this.usersRepository.create({ ...user }));
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async getById(id) {
    return await this.usersRepository.findOne(id);
  }
}
