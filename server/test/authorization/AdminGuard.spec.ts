import { strict as assert } from 'node:assert';
import { AdminGuard } from '../../src/authorization/domain/guards/AdminGuard';
import { UserGuard } from '../../src/authorization/domain/guards/UserGuard';
import { TesUtils } from '../TestUtils';
import { createExecutionContextWithEmptyToken } from './UserGuard.spec';

describe('AdminGuard', async () => {
    let adminGuard: UserGuard;

    before(async () => {
        const testingContainer = await TesUtils.createTestingContainer()
        adminGuard = testingContainer.get(AdminGuard)
    });

    it('retrun false if request does not contain token in headers', async () => {
        const executionContext = createExecutionContextWithEmptyToken()
        const result = await adminGuard.canActivate(executionContext)
        assert.equal(result, false);
    })
})