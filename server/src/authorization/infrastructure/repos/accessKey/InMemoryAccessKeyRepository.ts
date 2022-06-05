import { Injectable } from "@nestjs/common";
import { AccessKey } from "../../../domain/accessKey/AccessKey";
import { AuthToken } from "../../../domain/accessKey/AuthToken";
import { IAccessKeyRepository } from "../../../domain/accessKey/IAccessKeyRepository";

@Injectable()
export class InMemoryAccessKeyRepository implements IAccessKeyRepository {
    private db = new Set<AccessKey>()

    public async findByToken(token: AuthToken): Promise<AccessKey | null> {
        for (let accessKey of Array.from(this.db)) {
            if (accessKey.getToken().equals(token)) {
                return accessKey
            }
        }

        return null;
    }

    public async update(newAccessKey: AccessKey): Promise<void> {
        for (let accessKey of Array.from(this.db)) {
            if (accessKey.getId().equals(newAccessKey.getId())) {
                this.db.delete(accessKey);
                this.db.add(newAccessKey);
                return;
            }
        }
        throw new Error('AccessKey not found');
    }

    public async add(accessKey: AccessKey): Promise<void> {
        this.db.add(accessKey);
    }

    public async clear(): Promise<void> {
        this.db.clear();
    }
}


