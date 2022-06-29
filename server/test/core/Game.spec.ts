import { strict as assert } from 'node:assert';
import { UserID } from '../../src/authorization/domain/user/User';
import { GameName } from '../../src/core/domain/game/GameName';
import { ITestingContainer, TesUtils } from '../TestUtils';

describe.skip('Game', async () => {
  let ctx: ITestingContainer;

  before(async () => {
    ctx = await TesUtils.createCustomContainer();
  });

  beforeEach(async () => {
    await ctx.gameRepository.clear();
    await ctx.cardRepository.clear();
  });

  describe('assignCardsForPlayers', async () => {
    it('split cards to participants', async () => {});
    it('throw error if number of given cards is less than needed card count for game', async () => {
      await TesUtils.createDummyCards(ctx, 3);

      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('dummy'),
      );

      game.addUser(UserID.create());
      game.addUser(UserID.create());

     const cardsCount =  game.startGame();
      
    

    //     assert.throws(
    //     () => {
    //       game.assignCardsForPlayers(new Array(cardsCount));
    //     },
    //   );
    });
  });
});
