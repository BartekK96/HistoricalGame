import { AccessKey } from "./AccessKey";

export abstract class IAccessKeyRepository {
    abstract add(accessKey: AccessKey): Promise<void>;
}