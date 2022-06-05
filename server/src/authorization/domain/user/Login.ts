import { Immutable } from "../../../kernel/decorators/Immutable";

@Immutable()
export class Login {

    constructor(
        private login: string
    ) {
        this.login = this.login.trim();
        const regexp = new RegExp('^[a-zA-Z0-9]*$');
        if (!regexp.test(this.login)) {
            throw new Error('Login must contain only numbers and letters')
        }

        if (this.login.length < 4) {
            throw new Error('Login must contain at least 4 signs')
        }

        if (this.login.length > 16) {
            throw new Error('Login must contain maxium 16 signs')
        }
    }

    public equals(login: Login): boolean {
        return this.login === login.toString()
    }

    public toString(): string {
        return this.login;
    }
}