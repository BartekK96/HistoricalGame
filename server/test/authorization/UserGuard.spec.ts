import { ExecutionContext } from '@nestjs/common';
import { strict as assert } from 'node:assert';
import { AccessKeyFactor } from '../../src/authorization/domain/accessKey/AccessKeyFactory';
import { IAccessKeyRepository } from '../../src/authorization/domain/accessKey/IAccessKeyRepository';
import { UserGuard } from '../../src/authorization/domain/guards/UserGuard';
import { TesUtils } from '../TestUtils';

export type KeyValueObject = { [key: string]: Object }

export const createExecutionContextWithEmptyToken = (): ExecutionContext => {
    return {
        switchToHttp: (): any => {
            return {
                getRequest: (): KeyValueObject => {
                    return { headers: { token: '' } }
                }
            }
        }
    } as ExecutionContext
}

describe('UserGuard', async () => {
    let userGuard: UserGuard;
    let accessKeyFactory: AccessKeyFactor;
    let accessKeyRepository: IAccessKeyRepository;

    before(async () => {
        const testingContainer = await TesUtils.createTestingContainer()
        userGuard = testingContainer.get(UserGuard)
        accessKeyFactory = testingContainer.get(AccessKeyFactor)
        accessKeyRepository = testingContainer.get(IAccessKeyRepository)
    });

    it('retrun false if request does not contain token in headers', async () => {
        const executionContext = createExecutionContextWithEmptyToken()
        const result = await userGuard.canActivate(executionContext)
        assert.equal(result, false);
    })
})