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
        const rawPassword = new RawPasswod(password);
        const user = new User(
            UserID.create(),
            new Login(login),
            await Password.createHashedPassword(rawPassword),
            UserRole.USER,
            this.timeService.now()
        )
        return user;
    }

    public async createAdminUser(
        login: string,
        password: string,
    ): Promise<User> {
        const rawPassword = new RawPasswod(password);
        const user = new User(
            UserID.create(),
            new Login(login),
            await Password.createHashedPassword(rawPassword),
            UserRole.ADMIN,
            this.timeService.now()
        )
        return user;
    }
}