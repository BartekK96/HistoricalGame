import { Injectable } from "@nestjs/common";
import { CreateUserCommand } from "../application/CreateUserCommand";
import { IUserRepository } from "./IUserRepository";
import { UserFactory } from "./UserFactory";

@Injectable()
export class UserService {

    constructor(
        private userFactory: UserFactory,
        private userRepository: IUserRepository,
    ) { }

    public async register(
        command: CreateUserCommand
    ): Promise<void> {
        const user = await this.userFactory.createCommonUser(
            command.login,
            command.password
        );
        await this.userRepository.create(user);
    }
}