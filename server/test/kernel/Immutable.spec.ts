import { strict as assert } from 'assert';
import { Immutable } from '../../src/kernel/Immutable';

describe('Immutable', function() {
  
    it('marks value object as immutable after initialization', function() {
    
    @Immutable()
    class Age {
      constructor(public age: number) {
        if (this.age < 0) {
          throw new Error('Negative age is not supported');
        }
      }
    }

    const age = new Age(10);

    assert.throws(function() {
      age.age = 11;
    });

    assert.ok(age instanceof Age);
  });
});
