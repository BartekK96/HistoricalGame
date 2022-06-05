import * as bcrypt from 'bcrypt';
import { Immutable } from "../../../kernel/decorators/Immutable";
import { RawPasswod } from './RawPassword';

@Immutable()
export class Password {

    constructor(
        private password: string
    ) { }

    static async createHashedPassword(password: RawPasswod): Promise<Password> {
        const hashedPassword = await bcrypt.hash(password.toString(), bcrypt.genSaltSync(10));
        return new Password(hashedPassword);
    }

    public async comparePassword(password: Password): Promise<boolean> {
        return bcrypt.compare(password.toString(), this.password);
    }

    public toString(): string {
        return this.password;
    }
}