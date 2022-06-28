import { Injectable } from '@nestjs/common';
import { TestOnly } from '../../../../kernel/decorators/TestOnly';
import { Card } from '../../../domain/cards/Card';
import { ICardRepository } from '../../../domain/cards/ICardRepository';

@Injectable()
export class InMemoryCardRepository implements ICardRepository {
  private db = new Set<Card>();

  public async add(card: Card): Promise<void> {
    this.db.add(card);
  }
  public async update(newCard: Card): Promise<void> {
    for (let card of Array.from(this.db)) {
      if (card.getID().equals(newCard.getID())) {
        this.db.delete(card);
        this.db.add(newCard);
        break;
      }
    }

    throw new Error('Card not found');
  }

  @TestOnly()
  public async clear(): Promise<void> {
    this.db.clear();
  }

  public findRandomNumberOfCards(numberOfCards: number): Promise<Card[]> {
    return [] as any
  }
}
