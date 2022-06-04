import { Body, Controller, Get, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { UserGuard } from '../../../authorization/domain/guards/UserGuard';
import { CreateCardCommand } from '../../application/commands/CreateCardCommand';
import { CardService } from '../../domain/cards/CardService';

@Controller('cards')
export class CardController {


    constructor(
        private cardService: CardService,
    ) {

    }

    // todo: admin use case
    @Post()
    public async create(
        @Body() body: CreateCardCommand
    ): Promise<void> {
    }

    // todo: admin use case
    @Get()
    @UseGuards(UserGuard)
    public async getCards(
        @Body() body: any
    ): Promise<void> {
        console.log('Using get cards')
    }
}
