import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AccessKeyService } from "../accessKey/AccessKeyService";

@Injectable()
export class UserGuard implements CanActivate {

    // todo: add decorator pattern for redis for keys on repo
    constructor(
        private accessKeyService: AccessKeyService,
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.token) {
            return false;
        }
        return this.validateToken(request.headers.token);
    }

    private async validateToken(token: string): Promise<boolean> {
        return this.accessKeyService.validateUserToken(token);
    }
}
