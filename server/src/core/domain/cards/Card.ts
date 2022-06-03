import { UserID } from "../../../authorization/domain/user/User";
import { DateValue } from "../../../kernel/DateValue";
import { Entity } from "../../../kernel/Entity";
import { Identifier } from "../../../kernel/Identifier";

export class CardID extends Identifier { }

export class Card extends Entity {

    constructor(
        private id: CardID,
        private description: string,
        private event: string,
        private year: number,
        private createdAt: DateValue,
        private creator: UserID,
    ) {
        super()
    }

    public update(
        year: number,
        event: string,
        description: string
    ): void {
        this.year = year;
        this.event = event;
        this.description = description
    }
}