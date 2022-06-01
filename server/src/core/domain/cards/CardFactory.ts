import { Injectable } from "@nestjs/common";
import { UserID } from "../../../authorization/domain/User";
import { ITimeService } from "../ITimeService";
import { Card, CardID } from "./Card";

@Injectable()
export class CardFactory {

    constructor(
        private timeService: ITimeService
    ) { }

    public createCardForUser(
        yaer: number,
        event: string,
        description: string,
        user: UserID,
    ): Card {
        return new Card(
            CardID.create(),
            description,
            event,
            yaer,
            this.timeService.now(),
            user
        )
    }
}