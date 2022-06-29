import { strict as assert } from 'assert';
import { ITestingContainer, TesUtils } from '../TestUtils';

describe('CardService', async () => {
  let ctx: ITestingContainer;

  before(async () => {
    ctx = await TesUtils.createCustomContainer();
  });

  beforeEach(async () => {
    await ctx.cardRepository.clear();
  });

  it('getCardsForGame return proper amount of cards', async () => {
    const numberOfCards = 10;
    await TesUtils.createDummyCards(ctx, numberOfCards);

    const cards = await ctx.cardService.getCardsForGame(numberOfCards);
    assert.equal(cards.length, numberOfCards);
  });

  it('getCardsForGame do not retrurn duplicates', async () => {
    const numberOfCards = 10;
    await TesUtils.createDummyCards(ctx, numberOfCards);
    const cards = await ctx.cardService.getCardsForGame(numberOfCards);
    const ids = cards.map(card => card.getID().toString());
    assert.equal(new Set(ids).size, numberOfCards);
  });
});
