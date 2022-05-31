import { IEqualable } from "./interfaces/IEqualable";
import * as bson from 'bson';
import { HttpException, HttpStatus } from "@nestjs/common";

type ObjectID = bson.ObjectID | string;

export class Identifier implements IEqualable<Identifier>{
    public readonly value: bson.ObjectID;

    constructor(value: ObjectID) {
        if (typeof value === 'undefined') {
          throw new HttpException(
            'Invalid identifier value',
            HttpStatus.BAD_REQUEST,
          );
        }
    
        try {
          this.value = new bson.ObjectID(value);
        } catch (e) {
          if (e instanceof TypeError) {
            throw new HttpException(
              `Invalid identifier format. ${e.message}`,
              HttpStatus.BAD_REQUEST,
            );
          }
          throw e;
        }
      }

      public equals(id: Identifier): boolean {
          return this.value.equals(id.value);
      }
}