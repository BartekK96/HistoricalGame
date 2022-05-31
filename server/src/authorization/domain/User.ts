import { Entity } from "../../kernel/Entity";


export class User extends Entity {

    constructor(
        private id:string,
        private login:string,
        private password:string,
        private organization:string,
    ) {
        super()
    }
}