import { AccessKey } from "./AccessKey";
import { AuthToken } from "./AuthToken";

export abstract class IAccessKeyRepository {
    abstract add(accessKey: AccessKey): Promise<void>;

    abstract findByToken(token: AuthToken): Promise<AccessKey | null>;

    abstract update(accessKey: AccessKey): Promise<void>;

    abstract clear(): Promise<void>;
}