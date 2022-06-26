import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DateValue } from '../../../../kernel/DateValue';
import { IUserRepository } from '../../../domain/user/IUserRepository';
import { Login } from '../../../domain/user/Login';
import { Password } from '../../../domain/user/Password';
import { User, UserID } from '../../../domain/user/User';
import { UserRole } from '../../../domain/user/UserRole';

interface IUserPO extends Document, UserPO {
  readonly id: string;
}

class UserPO {
  public readonly id: string;
  public readonly login: string;
  public readonly password: string;
  public readonly role: string;
  public readonly createdAt: string;

  constructor(user: User) {
    const userPlainObject = user.getPlainObject();
    this.id = userPlainObject.id;
    this.login = userPlainObject.login;
    this.role = userPlainObject.role;
    this.password = userPlainObject.password;
    this.createdAt = userPlainObject.createdAt;
  }

  static toEntity(user: UserPO): User {
    return new User(
      new UserID(user.id),
      new Login(user.login),
      new Password(user.password),
      new UserRole(user.role),
      new DateValue(user.createdAt),
    );
  }
}

export const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    alias: 'id',
  },
  login: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  role: mongoose.Schema.Types.String,
  createdAt: mongoose.Schema.Types.Date,
});

export class MongoDbUserRepository implements IUserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUserPO>,
  ) {}

  public async add(user: User): Promise<void> {
    await this.userModel.create(new UserPO(user));
  }
  getByID(id: UserID): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByLogin(login: Login): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
