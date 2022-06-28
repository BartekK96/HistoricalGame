import { Card } from "./Card";

export abstract class ICardRepository {
    abstract add(card: Card): Promise<void>;

    abstract update(card: Card): Promise<void>;

    // todo: consider moving algorith for that to domain
    abstract findRandomNumberOfCards(numberOfCards:number): Promise<Card[]>;

    abstract clear(): Promise<void>;
}