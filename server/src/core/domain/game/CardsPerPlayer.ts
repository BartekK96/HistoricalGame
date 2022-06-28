import { Immutable } from '../../../kernel/decorators/Immutable';

@Immutable()
export class CardsPerPlayer {
  constructor(private value: number) {
    this.#assertCorrectCardsNumber();
  }

  #assertCorrectCardsNumber() {
    if (this.value < 1) {
      throw new Error('Cards per player must be greater than 0');
    }

    if (this.value > 10) {
      throw new Error('Cards per player must be less than 11');
    }
  }

  public valueOf(): number {
    return this.value;
  }
}
