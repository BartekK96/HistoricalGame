import * as bcrypt from 'bcrypt';
import { Immutable } from "../../../kernel/Immutable";

// todo: create hash servce

@Immutable()
export class Password {

    constructor(
        private password: string
    ) { }

    public async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    }

    public async comparePassword(password: Password): Promise<boolean> {
        return bcrypt.compare(password.toString(), this.password);
    }

    public toString(): string {
        return this.password;
    }
}