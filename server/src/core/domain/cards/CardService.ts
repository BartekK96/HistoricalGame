import { Injectable } from '@nestjs/common';
import { Card } from './Card';
import { CardFactory } from './CardFactory';
import { ICardRepository } from './ICardRepository';

@Injectable()
export class CardService {
  constructor(
    private cardRepository: ICardRepository,
    private cardFactory: CardFactory,
  ) {}

  // todo: add validation
  public async createNewCard(
    year: number,
    event: string,
    description: string,
  ): Promise<void> {
    const card = this.cardFactory.createCard(year, event, description);
    await this.cardRepository.add(card);
  }

  public async getCardsForGame(numberOfCards: number): Promise<Card[]> {
    return this.cardRepository.findRandomNumberOfCards(numberOfCards);
  }
}
