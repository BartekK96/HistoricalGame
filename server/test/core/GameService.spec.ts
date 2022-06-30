import { strict as assert } from 'node:assert';
import { UserID } from '../../src/authorization/domain/user/User';
import { GameName } from '../../src/core/domain/game/GameName';
import { ITestingContainer, TesUtils } from '../TestUtils';

describe.skip('GameService', async () => {
  let ctx: ITestingContainer;

  before(async () => {
    ctx = await TesUtils.createCustomContainer();
  });

  beforeEach(async () => {
    await ctx.gameRepository.clear();
  });

  describe('startGame', async () => {
    it('start game and choose cards for each player in game', async () => {
      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('test'),
      );
      game.addUser(UserID.create())
      game.addUser(UserID.create())
      game.addUser(UserID.create())
      
      await ctx.gameRepository.add(game);

      assert.equal(game.usersCards.length, 0);
      await ctx.gameService.startGame(new GameName(game.getPlainObject().name));

      const gameAfterUpdate = await ctx.gameRepository.getByID(game.id);
      assert.ok(gameAfterUpdate);
      
    });

    it('throw error if someone try to join started game', async () => {});
    it('throw error if game with given name does not exists', async () => {});
  });
});
