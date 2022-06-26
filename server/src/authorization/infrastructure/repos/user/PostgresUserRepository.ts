import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/user/IUserRepository';
import { Login } from '../../../domain/user/Login';
import { User, UserID } from '../../../domain/user/User';


@Injectable()
export class PostgresUserRepository implements IUserRepository {
  constructor(
  ) {}

  public async add(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async getByID(id: UserID): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  public async findByLogin(login: Login): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
