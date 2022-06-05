import * as bcrypt from 'bcrypt';
import { Immutable } from "../../../kernel/decorators/Immutable";

@Immutable()
export class RawPasswod {

    constructor(
        private password: string
    ) {
        this.password = password.trim();
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

    public toString(): string {
        return this.password;
    }

}