import { Injectable } from "@nestjs/common";
import { DateValue } from "../../../kernel/DateValue";
import { UserID } from "../user/User";
import { AccessKey, AccessKeyID } from "./AccessKey";
import { AuthToken } from "./AuthToken";

@Injectable()
export class AccessKeyFactor {

    public createNewKey(user: UserID): AccessKey {
        const expiresAt = DateValue.after(DateValue.HOUR);

        return new AccessKey(
            AccessKeyID.create(),
            AuthToken.create(),
            expiresAt,
            user,
        );
    }
}