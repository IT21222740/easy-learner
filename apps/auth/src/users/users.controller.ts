
import { CreateUserRequest } from './dto/create-user.request';
import { UserService } from './users.service';
import { Body, Controller, Post , Get , Delete , Param} from '@nestjs/common';
@Controller('auth/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() usersData: CreateUserRequest) {
    return this.usersService.createUser(usersData);
  }

   @Get()
  async getEveryusers(){
    return this.usersService.getEveryusers();
  }

  @Delete()
  async deleteUsersById(@Body('id') id: string) {
    return this.usersService.deleteUsersById(id);
  }
}
