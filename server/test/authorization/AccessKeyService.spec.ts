import { strict as assert } from 'node:assert';
import { AccessKeyFactor } from "../../src/authorization/domain/accessKey/AccessKeyFactory";
import { AccessKeyService } from "../../src/authorization/domain/accessKey/AccessKeyService";
import { AuthToken } from "../../src/authorization/domain/accessKey/AuthToken";
import { IAccessKeyRepository } from "../../src/authorization/domain/accessKey/IAccessKeyRepository";
import { IUserRepository } from '../../src/authorization/domain/user/IUserRepository';
import { UserID } from '../../src/authorization/domain/user/User';
import { UserFactory } from '../../src/authorization/domain/user/UserFactory';
import { TesUtils } from "../TestUtils";

describe('AccessKeyService', async () => {
    let accessKeyFactory: AccessKeyFactor;
    let accessKeyRepository: IAccessKeyRepository;
    let accessKeyService: AccessKeyService;
    let userFactory: UserFactory;
    let userRepository: IUserRepository;

    before(async () => {
        const testingContainer = await TesUtils.createTestingContainer()
        accessKeyFactory = testingContainer.get(AccessKeyFactor)
        accessKeyRepository = testingContainer.get(IAccessKeyRepository)
        accessKeyService = testingContainer.get(AccessKeyService)
        userRepository = testingContainer.get(IUserRepository)
        userFactory = testingContainer.get(UserFactory)
    });

    beforeEach(async () => {
        await accessKeyRepository.clear()
    })

    afterEach(async () => {
        await accessKeyRepository.clear()
    })

    describe('validateUserToken', async () => {
        it('throw error if token has bad structure', async () => {
            await assert.rejects(
                async () => {
                    await accessKeyService.validateUserToken('BadToken')
                },
                {
                    name: 'HttpException',
                    message: 'Invalid uuid'
                }
            )
        })

        it('throw error if token does not exists on db', async () => {
            const token = AuthToken.create()
            await assert.rejects(
                async () => {
                    await accessKeyService.validateUserToken(token.toString())
                },
                {
                    name: 'UnauthorizedException',
                    message: 'Access Forbidden'
                }
            )
        })

        it('throw error if authorization token is already expired', async () => {
            const accessKey = accessKeyFactory.createNewKey(UserID.create());
            accessKey.expire()
            await accessKeyRepository.add(accessKey);

            await assert.rejects(
                async () => {
                    await accessKeyService.validateUserToken(accessKey.getToken().toString())
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
            const result = await accessKeyService.validateUserToken(accessKey.getToken().toString())

            assert.ok(result)
        })
    })

    describe('validateAdminToken', async () => {
        it('throw error if token has bad structure', async () => {
            await assert.rejects(
                async () => {
                    await accessKeyService.validateAdminToken('BadToken')
                },
                {
                    name: 'HttpException',
                    message: 'Invalid uuid'
                }
            )
        })
        it('throw error if token does not exists on db', async () => {
            const token = AuthToken.create()
            await assert.rejects(
                async () => {
                    await accessKeyService.validateAdminToken(token.toString())
                },
                {
                    name: 'UnauthorizedException',
                    message: 'Access Forbidden'
                }
            )
        })

        it('throw error if authorization token is already expired', async () => {
            const accessKey = accessKeyFactory.createNewKey(UserID.create());
            accessKey.expire()
            await accessKeyRepository.add(accessKey);

            await assert.rejects(
                async () => {
                    await accessKeyService.validateAdminToken(accessKey.getToken().toString())
                },
                {
                    name: 'UnauthorizedException',
                    message: 'Token expired'
                }
            )
        })

        it('throw error if there is no user assigned to token', async () => {
            const accessKey = accessKeyFactory.createNewKey(UserID.create());
            await accessKeyRepository.add(accessKey);

            await assert.rejects(
                async () => {
                    await accessKeyService.validateAdminToken(accessKey.getToken().toString())
                },
                {
                    name: 'UnauthorizedException',
                    message: 'Access Forbidden'
                }
            )
        })

        it('throw error if user assigned to token is not admin', async () => {
            const user = await userFactory.createCommonUser('login', 'password')
            await userRepository.add(user);

            const accessKey = accessKeyFactory.createNewKey(user.getID());
            await accessKeyRepository.add(accessKey);

            await assert.rejects(
                async () => {
                    await accessKeyService.validateAdminToken(accessKey.getToken().toString())
                },
                {
                    name: 'UnauthorizedException',
                    message: 'Access Forbidden'
                }
            )
        })

        it('retrun true if given token exist and user with admin role exist and prolong it', async () => {
            const user = await userFactory.createAdminUser('login', 'password')
            await userRepository.add(user);

            const accessKey = accessKeyFactory.createNewKey(user.getID());
            await accessKeyRepository.add(accessKey);

            const result = await accessKeyService.validateAdminToken(accessKey.getToken().toString())
            assert.ok(result)
        })
    })
})