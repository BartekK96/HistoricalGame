import { Injectable } from "@nestjs/common";
import { ITimeService } from "../../../core/domain/ITimeService";
import { Login } from "./Login";
import { Password } from "./Password";
import { RawPasswod } from "./RawPassword";
import { User, UserID } from "./User";
import { UserRole } from "./UserRole";

@Injectable()
export class UserFactory {

    constructor(
        private timeService: ITimeService,
    ) {

    }

    public async createCommonUser(
        login: string,
        password: string,
    ): Promise<User> {
        const user = new User(
            UserID.create(),
            new Login(login),
            new Password(password),
            UserRole.USER,
            this.timeService.now()
        )
        // await user.hashPassword()
        return user;
    }

    public async createAdminUser(
        login: string,
        password: string,
    ): Promise<User> {
        const user = new User(
            UserID.create(),
            new Login(login),
            new Password(password),
            UserRole.ADMIN,
            this.timeService.now()
        )
        // await user.hashPassword()
        return user;
    }
}