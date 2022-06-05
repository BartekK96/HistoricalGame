import { HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { DateValue } from "../../../kernel/DateValue";
import { Entity } from "../../../kernel/Entity";
import { Identifier } from "../../../kernel/Identifier";
import { Login } from "./Login";
import { Password } from "./Password";
import { UserRole } from "./UserRole";

export class UserID extends Identifier { }

export class User extends Entity {

    constructor(
        private id: UserID,
        private login: Login,
        private password: Password,
        private role: UserRole,
        private createdAt: DateValue,
    ) {
        super()
    }

    public getID(): UserID {
        return this.id;
    }

    public getLogin(): Login {
        return this.login;
    }

    public assertIsAdmin(): void {
        if (!this.isAdmin()) {
            throw new UnauthorizedException('Access Forbidden');
        }
    }

    public isAdmin(): boolean {
        return this.role.equals(UserRole.ADMIN)
    }

    public async hashPassword(): Promise<void> {
        await this.password.hashPassword()
    }

    public async assertValidPassword(password: Password): Promise<void> {
        if (!this.password.comparePassword(password)) {
            throw new HttpException('Wrong credencials', HttpStatus.BAD_REQUEST);
        }
    }
}