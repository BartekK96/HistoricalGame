import { Enum } from "../../../kernel/decorators/Enum";

@Enum.decorate()
export class GameState extends Enum {
    public static readonly INITIALIZED = new GameState('INITIALIZED');
    public static readonly STARTED = new GameState('STARTED');
    public static readonly FINISHED = new GameState('FINISHED');
    public static readonly CANCELED = new GameState('CANCELED');
}