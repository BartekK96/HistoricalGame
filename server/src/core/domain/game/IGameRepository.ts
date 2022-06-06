import { Game } from "./Game";

export abstract class IGameRepository {
    abstract add(game: Game): Promise<void>;
}