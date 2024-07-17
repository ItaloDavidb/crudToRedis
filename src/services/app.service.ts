import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User-entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: User): Promise<Omit<User, 'password'>> {
    const userCreate = await this.userRepository.save(user);
    const { password, ...result } = userCreate;
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
