import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthToken } from "../accessKey/AuthToken";
import { IAccessKeyRepository } from "../accessKey/IAccessKeyRepository";

@Injectable()
export class UserGuard implements CanActivate {

    // todo: add decorator pattern for redis for keys on repo
    constructor(
        public accessKeyRepo: IAccessKeyRepository,
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.token) {
            return false;
        }
        return this.validateToken(request.headers.token);
    }

    private async validateToken(token: string): Promise<boolean> {
        try {
            const accessKey = await this.accessKeyRepo.findByToken(
                new AuthToken(token),
            );

            if (!accessKey) {
                throw new UnauthorizedException('Access Forbidden')
            }

            if (accessKey.isAlreadyExpired()) {
                throw new UnauthorizedException('Token expired')
            }

            accessKey.prolong()

            await this.accessKeyRepo.update(accessKey)

            return true
        } catch (err) {
            throw new UnauthorizedException('Can not resolve authorization token')
        }
    }
}
