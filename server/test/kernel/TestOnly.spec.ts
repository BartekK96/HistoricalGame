import { strict as assert } from 'node:assert';
import { TestOnly } from "../../src/kernel/decorators/TestOnly";

describe('TestOnly', async () => {
    let nodeEnv: string | undefined;

    describe('testing env', () => {
        before(() => {
            nodeEnv = process.env.NODE_ENV
            process.env.NODE_ENV = 'testing'
        })

        after(() => {
            process.env.NODE_ENV = nodeEnv;
        })

        it('decorator allow to run mehtod in testing mode', async () => {
            class Service {
                @TestOnly()
                public testingMethod() {

                }
            }

            const test = new Service();
            test.testingMethod()
        })
    })

    describe('another env', () => {
        before(() => {
            nodeEnv = process.env.NODE_ENV
            process.env.NODE_ENV = 'prod'
        })

        after(() => {
            process.env.NODE_ENV = nodeEnv;
        })

        it('decorator throw error if is not run method in testing mode', async () => {
            class AnotherService {
                @TestOnly()
                public testingMethod() {

                }
            }

            const test = new AnotherService();
            await assert.rejects(
                async () => {
                    test.testingMethod()
                },
                {
                    name: 'Error',
                    message: 'Test method can be used only in testing environment - testingMethod'
                }
            )
        })
    })
})