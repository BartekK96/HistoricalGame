import { HttpException, HttpStatus } from '@nestjs/common';
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
            throw new HttpException('Password need at least 8 signs', HttpStatus.BAD_REQUEST);
        }

        if (this.password.length > 24) {
            throw new HttpException('Password must contain only 24 signs', HttpStatus.BAD_REQUEST);
        }
    }

    public toString(): string {
        return this.password;
    }

}