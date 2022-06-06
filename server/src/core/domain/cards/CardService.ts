import { Injectable } from "@nestjs/common";
import { AuthorizationClient } from "../../../authorization/infrastructure/AuthorizationClient";
import { CardFactory } from "./CardFactory";
import { ICardRepository } from "./ICardRepository";

@Injectable()
export class CardService {

    constructor(
        private cardRepository: ICardRepository,
        private cardFactory: CardFactory,
    ) { }

    public async createNewCard(
        year: number,
        event: string,
        description: string,
    ): Promise<void> {
        const card = this.cardFactory.createCardForUser(
            year,
            event,
            description,
        )
        await this.cardRepository.add(card)
    }
}