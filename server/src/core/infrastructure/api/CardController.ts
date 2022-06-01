import { Body, Controller, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { CreateCardCommand } from '../../application/commands/CreateCardCommand';
import { CardService } from '../../domain/cards/CardService';

@Controller('cards')
export class CardController {


    constructor(
        private cardService: CardService,
    ) {

    }

    @Post()
    public async create(
        @Body() body: CreateCardCommand
    ): Promise<void> {
 
    }
}
