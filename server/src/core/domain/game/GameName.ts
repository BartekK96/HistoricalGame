import { Immutable } from '../../../kernel/decorators/Immutable';

@Immutable()
export class GameName {
  constructor(private name: string) {
    this.assertCorrectLength();
  }

  private assertCorrectLength() {
    if (this.name.length < 4) {
      throw new Error('Game name is too short');
    }
    if (this.name.length > 16) {
      throw new Error('Game name is too long');
    }
  }

  public toString(): string {
    return this.name;
  }

  public equals(name: GameName): boolean {
    return this.name === name.toString();
  }
}
