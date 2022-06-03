import { UserID } from "../../authorization/domain/user/User";
import { DateValue } from "../../kernel/DateValue";
import { Entity } from "../../kernel/Entity";
import { Identifier } from "../../kernel/Identifier";
import { CardID } from "./cards/Card";

export class GameID extends Identifier { }

export interface IUserCards {
    userID: UserID,
    cards: CardID[]
}

export class Game extends Entity {

    constructor(
        private id: GameID,
        private owner: UserID,
        private name: string,
        private participants: UserID[],
        private usersCards: IUserCards[],
        private cardsPerPlayer: number,
        private startedAt: DateValue
    ) {
        super()
    }

}