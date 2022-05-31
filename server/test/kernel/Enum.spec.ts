import { strict as assert } from 'assert';
import { Enum } from "../../src/kernel/Enum";

describe('Enum', async () => {
    it('Enum throw error if try to use duplicated value', async () => {
        let err: Error | null = null

        try{
            @Enum.decorate()
            class Cards extends Enum {
                public static readonly CARD_ONE = new Cards('CARD_ONE');
                public static readonly CARD_TWO = new Cards('CARD_TWO');
                public static readonly CARD_ONE_DUPLICATE = new Cards('CARD_ONE');
            }
        }catch(error){
            err = error
        }
        assert.equal(err?.message,'Duplicate key CARD_ONE in enum Cards');
    })


    it('compare enums', async () => {
        const cardOne = 'CARD_ONE'
        const cardTwo = 'CARD_TWO'

        @Enum.decorate()
        class Cards extends Enum {
            public static readonly CARD_ONE = new Cards('CARD_ONE');
            public static readonly CARD_TWO = new Cards('CARD_TWO');
        }

        assert.ok(Cards.CARD_ONE.equals(new Cards(cardOne)));
        assert.ok(Cards.CARD_TWO.equals(new Cards(cardTwo)));
    })
})