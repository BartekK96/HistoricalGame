import { Injectable } from "@nestjs/common";
import { ICardRepository } from "./ICardRepository";

@Injectable()
export class CardService{

    constructor(
        cardRepository:ICardRepository
    ){}

    public async createNewCard():Promise<void>{

    }
}