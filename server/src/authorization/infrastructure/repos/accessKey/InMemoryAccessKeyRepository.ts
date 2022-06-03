import { Injectable } from "@nestjs/common";
import { AccessKey } from "../../../domain/accessKey/AccessKey";
import { IAccessKeyRepository } from "../../../domain/accessKey/IAccessKeyRepository";

@Injectable()
export class InMemoryAccessKeyRepository implements IAccessKeyRepository {
    private db = new Set<AccessKey>()

    public async add(accessKey: AccessKey): Promise<void> {
        this.db.add(accessKey);
    }
}


