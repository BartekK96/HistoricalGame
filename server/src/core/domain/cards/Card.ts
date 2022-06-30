import { DateValue } from '../../../kernel/DateValue';
import { Entity } from '../../../kernel/Entity';
import { Identifier } from '../../../kernel/Identifier';

export interface ICardPlainObject {
  id: string;
  description: string;
  event: string;
  year: number;
  createdAt: string;
}

export class CardID extends Identifier {}

export class Card extends Entity {
  constructor(
    private id: CardID,
    private description: string,
    private event: string,
    private year: number,
    private createdAt: DateValue,
  ) {
    super();
  }

  public getID(): CardID {
    return this.id;
  }

  public update(year: number, event: string, description: string): void {
    this.year = year;
    this.event = event;
    this.description = description;
  }

  public getPlainObject(): ICardPlainObject {
    return {
      createdAt: this.createdAt.toISOString(),
      description: this.description,
      event: this.event,
      id: this.id.toString(),
      year: this.year,
    };
  }
}
