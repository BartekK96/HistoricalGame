import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../../../domain/user/IUserRepository";
import { Login } from "../../../domain/user/Login";
import { User, UserID } from "../../../domain/user/User";

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
    private db = new Set<User>()

    public async add(user: User): Promise<void> {
        this.db.add(user)
    }
    public async getByID(id: UserID): Promise<User | null> {
        for (let user of Array.from(this.db)) {
            if (user.getID().equals(id)) {
                return user
            }
        }

        return null;
    }
    public async findByLogin(login: Login): Promise<User | null> {
        for (let user of Array.from(this.db)) {
            if (user.getLogin().equals(login)) {
                return user
            }
        }
        return null;
    }
}