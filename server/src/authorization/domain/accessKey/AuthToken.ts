import { HttpException, HttpStatus } from '@nestjs/common';
import * as uuid from 'uuid';
import { Immutable } from '../../../kernel/Immutable';

@Immutable()
export class AuthToken {
  private static UUID_RE = new RegExp(
    `^${[8, 4, 4, 4, 12].map(num => `[0-9a-f]{${num}}`).join('-')}$`,
    'i',
  );

  private value: string;

  constructor(token: string) {
    if (!AuthToken.UUID_RE.test(token)) {
      throw new HttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
    }
    this.value = token;
  }

  public static create(): AuthToken {
    return new AuthToken(uuid.v4());
  }

  public toString(): string {
    return this.value;
  }

  public equals(token: AuthToken): boolean {
    return this.value === token.toString();
  }
}
