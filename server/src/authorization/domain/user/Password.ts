import * as bcrypt from 'bcrypt';
import { Immutable } from "../../../kernel/Immutable";

@Immutable()
export class Password {

    constructor(
        private password: string
    ) {
        this.password = this.password.trim();
        this.assertCorrectPasswordLength()
    }

    private assertCorrectPasswordLength(): void {
        if (this.password.length < 8) {
            throw new Error('Password need at least 8 signs');
        }

        if (this.password.length > 24) {
            throw new Error('Password must contain only 24 signs');
        }
    }

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