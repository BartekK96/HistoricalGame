import { Injectable } from "@nestjs/common";
import { UserID } from "../domain/user/User";

@Injectable()
export class AuthorizationClient {

    public async resolveUserIDByToken(token: string): Promise<UserID> {
        // todo
        return UserID.create()
    }
}