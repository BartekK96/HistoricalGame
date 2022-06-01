import { Injectable } from "@nestjs/common";
import { CardFactory } from "./CardFactory";
import { ICardRepository } from "./ICardRepository";

@Injectable()
export class CardService{

    constructor(
        private cardRepository:ICardRepository,
        private cardFactory:CardFactory,
    ){}

    public async createNewCard(
        year:number,
        event:string,
        description:string,
    ):Promise<void>{
    }
}