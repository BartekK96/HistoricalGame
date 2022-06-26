import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserCommand } from "../../application/CreateUserCommand";
import { LoginUserCommand } from "../../application/LoginUserCommand";
import { AccessKeyFactor } from "../accessKey/AccessKeyFactory";
import { AuthToken } from "../accessKey/AuthToken";
import { IAccessKeyRepository } from "../accessKey/IAccessKeyRepository";
import { IUserRepository } from "./IUserRepository";
import { Login } from "./Login";
import { Password } from "./Password";
import { UserID } from "./User";
import { UserFactory } from "./UserFactory";

export interface IAuthSession {
    token: AuthToken;
    user: UserID;
}

@Injectable()
export class UserService {

    constructor(
        private userFactory: UserFactory,
        private userRepository: IUserRepository,
        private accessKeyFactory: AccessKeyFactor,
        private accessKeyRepository: IAccessKeyRepository,
    ) { }

    public async register(
        command: CreateUserCommand
    ): Promise<IAuthSession> {
        console.log('user')

        let user = await this.userRepository
            .findByLogin(new Login(command.login));
        console.log(this.userRepository)
        if (user) {
            throw new HttpException('Login already exists', HttpStatus.BAD_REQUEST);
        }

        user = await this.userFactory.createCommonUser(
            command.login,
            command.password
        );
        await this.userRepository.add(user);

        const accessKey = await this.accessKeyFactory.createNewKey(user.getID());
        await this.accessKeyRepository.add(accessKey);

        return {
            token: accessKey.getToken(),
            user: user.getID(),
        };
    }

    public async login(command: LoginUserCommand): Promise<IAuthSession> {
        let user = await this.userRepository
            .findByLogin(new Login(command.login));

        if (!user) {
            throw new HttpException('Wrong credencials', HttpStatus.BAD_REQUEST);
        }

        // todo: user here RawPassword instead of Password VO - consider
        await user.assertValidPassword(new Password(command.password))

        const accessKey = await this.accessKeyFactory.createNewKey(user.getID());
        await this.accessKeyRepository.add(accessKey);

        return {
            token: accessKey.getToken(),
            user: user.getID(),
        };
    }
}