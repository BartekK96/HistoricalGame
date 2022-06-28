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

  it.skip('getCardsForGame return proper amount of cards', async () => {
    await TesUtils.createDummyCards(ctx, 10);

    const numberOfCards = 10;
    const cards = await ctx.cardService.getCardsForGame(numberOfCards);
    assert.equal(cards.length, numberOfCards);
  });

  it.skip('getCardsForGame do not retrurn duplicates', async () => {});
});
