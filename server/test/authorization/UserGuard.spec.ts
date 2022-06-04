import { ExecutionContext } from '@nestjs/common';
import { strict as assert } from 'node:assert';
import { AccessKeyFactor } from '../../src/authorization/domain/accessKey/AccessKeyFactory';
import { AuthToken } from '../../src/authorization/domain/accessKey/AuthToken';
import { IAccessKeyRepository } from '../../src/authorization/domain/accessKey/IAccessKeyRepository';
import { UserGuard } from '../../src/authorization/domain/guards/UserGuard';
import { UserID } from '../../src/authorization/domain/user/User';
import { TesUtils } from '../TestUtils';

type KeyValueObject = { [key: string]: Object }

// todo: create container and assign providers to conatiner instead of assign it to variables
describe('UserGuard', async () => {
    let userGuard: UserGuard;
    let accessKeyFactory: AccessKeyFactor;
    let accessKeyRepository: IAccessKeyRepository;

    const createExecutionContextWithEmptyToken = (): ExecutionContext => {
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

    const createExecutionContextWithGivenToken = (token: string): ExecutionContext => {
        return {
            switchToHttp: (): any => {
                return {
                    getRequest: (): KeyValueObject => {
                        return { headers: { token: token } }
                    }
                }
            }
        } as ExecutionContext
    }

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

    it('throw error if token has bad structure', async () => {
        await assert.rejects(
            async () => {
                const executionContext = createExecutionContextWithGivenToken('BadToken')
                const result = await userGuard.canActivate(executionContext)
            },
            {
                name: 'HttpException',
                message: 'Invalid uuid'
            })
    })

    it('throw error if token does not exists on db', async () => {
        const token = AuthToken.create()
        await assert.rejects(
            async () => {
                const executionContext = createExecutionContextWithGivenToken(token.toString())
                const result = await userGuard.canActivate(executionContext)
            },
            {
                name: 'UnauthorizedException',
                message: 'Access Forbidden'
            })
    })

    it('throw error if authorization token is already expired', async () => {
        const accessKey = accessKeyFactory.createNewKey(UserID.create());
        accessKey.expire()
        await accessKeyRepository.add(accessKey);

        await assert.rejects(
            async () => {
                const executionContext = createExecutionContextWithGivenToken(accessKey.getToken().toString())
                const result = await userGuard.canActivate(executionContext)
            },
            {
                name: 'UnauthorizedException',
                message: 'Token expired'
            }
        )
    })

    it('retrun true if given token exist and prolong it', async () => {
        const accessKey = accessKeyFactory.createNewKey(UserID.create());
        await accessKeyRepository.add(accessKey);

        const executionContext = createExecutionContextWithGivenToken(accessKey.getToken().toString())
        const result = await userGuard.canActivate(executionContext)

        assert.ok(result)
    })
})