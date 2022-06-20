import { Injectable } from "@nestjs/common";
import { UserID } from "../../../authorization/domain/user/User";
import { ITimeService } from "../ITimeService";
import { Game, GameID } from "./Game";
import { GameName } from "./GameName";
import { GameState } from "./GameState";

@Injectable()
export class GameFactory {

    constructor(
        private timeService: ITimeService,
    ) { }

    public createGame(
        userID: UserID,
        name: GameName,
    ): Game {
        return new Game(
            GameID.create(),
            userID,
            userID,
            name,
            GameState.INITIALIZED,
            [userID],
            [],
            5,
            this.timeService.nullValue(),
            this.timeService.nullValue(),
        )
    }
}