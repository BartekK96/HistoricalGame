import { Injectable } from "@nestjs/common";
import { UserID } from "../../../authorization/domain/user/User";
import { ITimeService } from "../ITimeService";
import { Game, GameID } from "./Game";
import { GameState } from "./GameState";

@Injectable()
export class GameFactory {

    constructor(
        private timeService: ITimeService,
    ) { }

    public createGame(
        userID: UserID,
        name: string,
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
            this.timeService.nullValue()
        )
    }
}