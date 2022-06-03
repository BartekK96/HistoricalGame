import { User, UserID } from "./User";

export abstract class IUserRepository {
    abstract create(user: User): Promise<void>;

    abstract getByID(id: UserID): Promise<User | null>;
}