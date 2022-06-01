import { Card } from "./Card";

export abstract class ICardRepository {
    abstract add(card: Card): Promise<void>;

    abstract update(card: Card): Promise<void>;
}