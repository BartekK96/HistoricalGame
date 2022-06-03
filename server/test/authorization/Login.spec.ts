import { strict as assert } from 'assert';
import { Login } from '../../src/authorization/domain/user/Login';

describe('Login', async () => {


    it('throw error if login does not contain only letters and numbers', async () => {
        assert.rejects(async () => new Login('asdf!'))
        assert.rejects(async () => new Login('   asdf'))
        assert.rejects(async () => new Login('asdf  lasd123@'))
        assert.rejects(async () => new Login('..asdasf '))
    })

    it('throw error if login is shorter than 4 signs', async () => {
        assert.rejects(async () => new Login('asd'))

    })

    it('throw error if login is longer than 16 signs', async () => {
        assert.rejects(async () => new Login('1234567890asdfghj '))
    })

    it('create correct Login value object', async () => {
        const correctLogin = new Login('testingLogin123  ');
        assert.equal(correctLogin.toString(), 'testingLogin123')
    })
})