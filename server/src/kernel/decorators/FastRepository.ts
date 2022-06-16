import { ClassConstructor } from './Immutable';

export function FastRepository<C extends ClassConstructor<any, any[]>>(
  constructor: C,
): C {
  class FastRepo extends constructor {
    constructor(...args: any[]) {
      super(args);
    }
  }

  for (const member in FastRepo) {
    if (FastRepo.hasOwnProperty(member)) {
      console.log(member)
    }
  }

  return FastRepo;
}
