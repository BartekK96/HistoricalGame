import { strict as assert } from 'node:assert';
import { UserID } from '../../src/authorization/domain/user/User';
import { GameName } from '../../src/core/domain/game/GameName';
import { ITestingContainer, TesUtils } from '../TestUtils';

describe('Game', async () => {
  let ctx: ITestingContainer;

  before(async () => {
    ctx = await TesUtils.createCustomContainer();
  });

  beforeEach(async () => {
    await ctx.gameRepository.clear();
    await ctx.cardRepository.clear();
  });

  describe('assignCardsForPlayers', async () => {
    it('split cards to participants', async () => {
      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('dummy'),
      );

      game.addUser(UserID.create());
      game.addUser(UserID.create());

      assert.equal(game.participants.length, 3);

      game.chooseNumberOfCardsPerPlayer(2);

      const numberOfCards = game.startGame();
      await TesUtils.createDummyCards(ctx, numberOfCards);
      const cards = await ctx.cardService.getCardsForGame(numberOfCards);
      game.assignCardsForPlayers(cards);

      assert.equal(game.usersCards.length, game.participants.length);
      for (let cards of game.usersCards) {
        assert.equal(cards.cards.length, game.cardsPerPlayer.valueOf());
      }
    });

    it('throw error if number of given cards is less than needed card count for game', async () => {
      await TesUtils.createDummyCards(ctx, 3);

      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('dummy'),
      );

      game.addUser(UserID.create());
      game.addUser(UserID.create());

      game.startGame();

      await assert.rejects(
        async () => {
          game.assignCardsForPlayers(new Array(3));
        },
        {
          name: 'Error',
          message: 'Incorect number of cards during card assigment',
        },
      );
    });
  });

  describe.skip('putCard', async () => {
    it('throw error if game is not started', async () => {});
    it('throw error if current player in game try to put card', async () => {});
    it('throw error if given card does not belong to user', async () => {});
  });
});
