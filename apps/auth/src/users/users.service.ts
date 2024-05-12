import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  async getEveryusers(){
    return this.usersRepository.find({});
   }
   async deleteUsersById(id: string) {
    const deletedUser = await this.usersRepository.deleteOne({ _id: id });

  return { message: 'User deleted successfully' };
  }

}
