import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IAccessKeyRepository } from './../accessKey/IAccessKeyRepository';
import { IUserRepository } from './../user/IUserRepository';

//todo: add validation for token and userId connections
@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        public accessKeyRepo: IAccessKeyRepository,
        public userRepo: IUserRepository,
    ) {
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.token) {
            return false;
        }
        return this.validateToken(request.headers.token);
    }

    private async validateToken(token: string): Promise<boolean> {
        return false;
    }
}
