import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../../authorization/domain/guards/AdminGuard';
import { UserGuard } from '../../../authorization/domain/guards/UserGuard';
import { AuthCommand } from '../../application/commands/AuthCommand';
import { CreateCardCommand } from '../../application/commands/CreateCardCommand';
import { CardService } from '../../domain/cards/CardService';

@Controller('cards')
export class CardController {

    constructor(
        private cardService: CardService,
    ) {
    }

    @Post()
    @UseGuards(AdminGuard)
    public async create(
        @Body() body: CreateCardCommand,
        @Headers() headers: AuthCommand,
    ): Promise<void> {
        await this.cardService.createNewCard(
            body.year,
            body.event,
            body.description,
        )
    }

    // todo: add pagination
    @Get()
    @UseGuards(AdminGuard)
    @UseGuards(UserGuard)
    public async getCards(
        @Body() body: any
    ): Promise<void> {
        console.log('Using get cards')
    }
}
