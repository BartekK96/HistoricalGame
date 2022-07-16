import { strict as assert } from 'node:assert';
import { UserID } from '../../src/authorization/domain/user/User';
import { GameName } from '../../src/core/domain/game/GameName';
import { GameState } from '../../src/core/domain/game/GameState';
import { ITestingContainer, TesUtils } from '../TestUtils';

describe('GameService', async () => {
  let ctx: ITestingContainer;

  before(async () => {
    ctx = await TesUtils.createCustomContainer();
  });

  beforeEach(async () => {
    await ctx.gameRepository.clear();
    await ctx.cardRepository.clear();
  });

  describe('startGame', async () => {
    it('start game change game state to started', async () => {
      await TesUtils.createDummyCards(ctx, 20);
      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('test'),
      );
      game.addUser(UserID.create());

      await ctx.gameRepository.add(game);

      assert.equal(game.usersCards.length, 0);
      await ctx.gameService.startGame(new GameName(game.getPlainObject().name));

      const gameAfterUpdate = await ctx.gameRepository.getByID(game.id);
      assert.ok(gameAfterUpdate);
      assert.ok(gameAfterUpdate.state.equals(GameState.STARTED));
    });

    it('throw error if someone try to join started game', async () => {
      await TesUtils.createDummyCards(ctx, 20);
      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('test'),
      );
      game.addUser(UserID.create());

      await ctx.gameRepository.add(game);
      await ctx.gameService.startGame(new GameName(game.getPlainObject().name));

      await assert.rejects(
        async () => {
          await ctx.gameService.joinGame('valid token', game.name);
        },
        {
          name: 'Error',
          message: 'Game is already started',
        },
      );
    });

    it('throw error if game with given name does not exists', async () => {
      await TesUtils.createDummyCards(ctx, 20);
      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('test'),
      );
      game.addUser(UserID.create());

      await ctx.gameRepository.add(game);
      await ctx.gameService.startGame(new GameName(game.getPlainObject().name));

      await assert.rejects(
        async () => {
          await ctx.gameService.joinGame(
            'valid token',
            new GameName('not existing'),
          );
        },
        {
          name: 'Error',
          message: 'Game with given name does not exists',
        },
      );
    });
  });

  describe.skip('getCurrentGameStatus', async () => {
    it('return current player, cards in game and player cards', async () => {});
  });

  describe.skip('placeCard', async () => {
    it('throw error if game does not exists', async () => {});
    it('throw error if game is not started', async () => {});
    it('throw error if current player in game try to put card', async () => {});
  });
});
