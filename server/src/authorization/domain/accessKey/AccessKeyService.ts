import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserRepository } from "../user/IUserRepository";
import { User, UserID } from "../user/User";
import { AccessKey } from "./AccessKey";
import { AuthToken } from "./AuthToken";
import { IAccessKeyRepository } from "./IAccessKeyRepository";

@Injectable()
export class AccessKeyService {
    constructor(
        private accessKeyRepo: IAccessKeyRepository,
        private userRepo: IUserRepository,
    ) { }


    public async validateUserToken(token: string): Promise<boolean> {
        const accessKey = await this.findByToken(token)

        accessKey.assertIsAlreadyExpired();

        accessKey.prolong()

        await this.accessKeyRepo.update(accessKey)

        return true
    }

    public async validateAdminToken(token: string): Promise<boolean> {
        const accessKey = await this.findByToken(token)
        accessKey.assertIsAlreadyExpired();

        const user = await this.findUserByID(accessKey.getUserId())
        user.assertIsAdmin()

        accessKey.prolong()

        await this.accessKeyRepo.update(accessKey)

        return true
    }

    private async findUserByID(userID: UserID): Promise<User> {
        const user = await this.userRepo.getByID(userID);

        if (!user) {
            throw new UnauthorizedException('Access Forbidden');
        }
        return user
    }


    private async findByToken(token: string): Promise<AccessKey> {
        const accessKey = await this.accessKeyRepo.findByToken(
            new AuthToken(token),
        );
        if (!accessKey) {
            throw new UnauthorizedException('Access Forbidden')
        }

        return accessKey
    }
}