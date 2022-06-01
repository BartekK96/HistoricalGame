import { Entity } from "../../kernel/Entity";
import { Identifier } from "../../kernel/Identifier";

export class OrganizationID extends Identifier { }

export class Organization extends Entity {


    constructor(
        private id: OrganizationID,
    ) {
        super()
    }
}