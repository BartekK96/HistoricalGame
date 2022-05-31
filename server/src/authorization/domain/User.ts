import { Entity } from "../../kernel/Entity";
import { Identifier } from "../../kernel/Identifier";
import { Login } from "./Login";

export class UserID extends Identifier { }

export class User extends Entity {

    constructor(
        private id: UserID,
        private login: Login,
        private password: string,
        private organization: string,
    ) {
        super()
    }
}