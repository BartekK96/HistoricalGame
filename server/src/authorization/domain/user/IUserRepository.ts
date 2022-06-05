import { Login } from "./Login";
import { User, UserID } from "./User";

export abstract class IUserRepository {
    abstract add(user: User): Promise<void>;

    abstract getByID(id: UserID): Promise<User | null>;

    abstract findByLogin(login: Login): Promise<User | null>;
}