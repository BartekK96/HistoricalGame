import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserCommand } from "../../application/CreateUserCommand";
import { LoginUserCommand } from "../../application/LoginUserCommand";
import { IAuthSession, UserService } from "../../domain/user/UserService";

@Controller('/auth')
export class UserController {

  constructor(
    private userService: UserService,
  ) { }

  @Post('/login')
  public async login(
    @Body() data: LoginUserCommand
  ): Promise<IAuthSession> {
    return this.userService.login(data);
  }

  @Post('/register')
  public async register(
    @Body() data: CreateUserCommand
  ): Promise<IAuthSession> {
    return this.userService.register(data);
  }
}