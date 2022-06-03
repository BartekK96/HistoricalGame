import { strict as assert } from 'assert';
import { AuthToken } from "../../src/authorization/domain/accessKey/AuthToken"

describe("AuthToken", () => {

    it('throw err if token is not uuid', () => {
        assert.rejects(async () => {
            new AuthToken('testingToken')
        })
    })
})