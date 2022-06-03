import { HttpException, HttpStatus } from "@nestjs/common";
import { DateValue } from "../../../kernel/DateValue";
import { Entity } from "../../../kernel/Entity";
import { Identifier } from "../../../kernel/Identifier";
import { UserID } from "../user/User";
import { AuthToken } from "./AuthToken";

export class AccessKeyID extends Identifier { }

export class AccessKey extends Entity {
    constructor(
        public id: AccessKeyID,
        public token: AuthToken,
        public expiredAt: DateValue,
        public user: UserID,
    ) {
        super()
    }

    public isAlreadyExpired(): boolean {
        return this.expiredAt.hasAlreadyPassed();
    }

    public prolong(): boolean {
        const prolongTo = DateValue.after(DateValue.HOUR);

        const canProlong = prolongTo.isAfter(this.expiredAt);

        if (canProlong) {
            this.expiredAt = DateValue.after(DateValue.HOUR);
            return true;
        }

        return false;
    }

    public expire() {
        if (this.isAlreadyExpired()) {
            throw new HttpException(
                'Access key is already expired',
                HttpStatus.BAD_REQUEST,
            );
        }

        this.expiredAt = DateValue.before(1);
    }
}