import { strict as assert } from 'assert';
import { AccessKey, AccessKeyID } from "../../src/authorization/domain/accessKey/AccessKey";
import { AuthToken } from "../../src/authorization/domain/accessKey/AuthToken";
import { UserID } from "../../src/authorization/domain/user/User";
import { DateValue } from "../../src/kernel/DateValue";

describe('AccessKey', async () => {

    it('isAlreadyExpired return true if access key is expired', () => {
        const accessKey = new AccessKey(
            AccessKeyID.create(),
            AuthToken.create(),
            DateValue.before(1),
            UserID.create(),
        )

        assert.ok(accessKey.isAlreadyExpired())
    })

    it('isAlreadyExpired return false if access key is not expired yet', () => {
        const accessKey = new AccessKey(
            AccessKeyID.create(),
            AuthToken.create(),
            DateValue.after(10),
            UserID.create(),
        )

        assert.equal(accessKey.isAlreadyExpired(), false)
    })


    // todo: mock time Service and use it 
    it('prolong extend token expireAt and return true', () => {
        const accessKey: AccessKey = new AccessKey(
            AccessKeyID.create(),
            AuthToken.create(),
            DateValue.after(10),
            UserID.create(),
        )

        assert.ok(accessKey.prolong())
        assert.ok(accessKey.getExpirationDate().isAfter(new DateValue(new Date(DateValue.HOUR - DateValue.MINUTE))))
    })

    it('prolong not extend token expireAt and return false', () => {
        const dateValueBefore = DateValue.after(DateValue.DAY);


        const accessKey = new AccessKey(
            AccessKeyID.create(),
            AuthToken.create(),
            dateValueBefore,
            UserID.create(),
        )
        assert.equal(accessKey.prolong(), false)
        assert.ok(accessKey.getExpirationDate().equals(dateValueBefore))
    })

    it('expire mark access token expired', () => {
        const accessKey = new AccessKey(
            AccessKeyID.create(),
            AuthToken.create(),
            DateValue.after(100),
            UserID.create(),
        )
        assert.equal(accessKey.isAlreadyExpired(), false)
        accessKey.expire()
        assert.equal(accessKey.isAlreadyExpired(), true)
    })
})