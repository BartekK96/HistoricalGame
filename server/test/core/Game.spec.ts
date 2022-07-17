import { strict as assert } from 'node:assert';
import { UserID } from '../../src/authorization/domain/user/User';
import { Game } from '../../src/core/domain/game/Game';
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

      const uniqCards = new Set();

      for (let cards of game.usersCards) {
        assert.equal(cards.cards.length, game.cardsPerPlayer.valueOf());
        cards.cards.map(card => uniqCards.add(card.getPlainObject().id));
      }

      assert.equal(uniqCards.size, numberOfCards);
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

  describe('putCard', async () => {
    let startedGame: Game;
    let currentPlayer: UserID;
    let notCurrentPlayer: UserID = UserID.create();

    before(async () => {
      await TesUtils.createDummyCards(ctx, 20);
      startedGame = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('dummy'),
      );
      startedGame.addUser(notCurrentPlayer);

      startedGame.chooseNumberOfCardsPerPlayer(2);

      const numberOfCards = startedGame.startGame();
      await TesUtils.createDummyCards(ctx, numberOfCards);
      const cards = await ctx.cardService.getCardsForGame(numberOfCards);
      startedGame.assignCardsForPlayers(cards);

      currentPlayer = startedGame.getCurrentPlayer();
    });

    it('throw error if game is not started', async () => {
      const game = ctx.gameFactory.createGame(
        UserID.create(),
        new GameName('dummy'),
      );
      await assert.rejects(
        async () => {
          game.putCard(
            UserID.create(),
            ctx.cardFactory.createCard(1, '1', '1'),
          );
        },
        {
          name: 'Error',
          message: 'Method not implemented.',
        },
      );
    });

    it('throw error if not current player in game try to put card', async () => {
      const cards = startedGame.getPlayerCards(notCurrentPlayer);
      await assert.rejects(
        async () => {
          startedGame.putCard(notCurrentPlayer, cards[0]);
        },
        {
          name: 'Error',
          message: 'There is no your turn',
        },
      );
    });

    it('throw error if given card does not belong to user', async () => {
      const cards = startedGame.getPlayerCards(notCurrentPlayer);

      await assert.rejects(
        async () => {
          startedGame.putCard(currentPlayer, cards[0]);
        },
        {
          name: 'Error',
          message: 'Player does not have this card',
        },
      );
    });

    it.skip('return false if placed card is placed in wrong place',async ()=>{

    })

    it.skip('return true if placed card is placed in correct place',async ()=>{

    })



  });
});
