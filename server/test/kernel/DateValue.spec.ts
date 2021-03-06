import { strict as assert } from 'assert';
import { DateValue } from "../../src/kernel/DateValue";

describe('DateValue', async () => {

    it('create DateValue with null value', () => {
        const date = new DateValue(null);
        assert.ok(date)
    })

    it('create DateValue from date string value', () => {
        const date1 = new DateValue("2022-06-01T17:50:47.671Z")
        assert.ok(date1)
    })

    it('create DateValue from Date value', () => {
        const date = new DateValue(new Date('2022-06-01T17:50:47.671Z'))
        assert.ok(date)
    })

    it('throw error if invalid date format is given', () => {
        assert.rejects(async () => {
            const date = new DateValue("Wed Jun 01 2022")
        })
    })

    it('return true if comapre same DateValue', () => {
        const date1 = new DateValue(new Date('2022-06-01T17:50:47.671Z'))
        const date2 = new DateValue(new Date('2022-06-01T17:50:47.671Z'))

        assert.ok(date1.equals(date2))
    })

    it('return false if comapre different DateValue', () => {
        const date1 = new DateValue(new Date('2022-06-01T17:50:47.671Z'))
        const date2 = new DateValue(new Date('2022-06-01T17:51:47.671Z'))

        assert.equal((date1.equals(date2)), false)
    })

    it('isBefore return true if date is before dateValue', () => {
        const date = new DateValue(new Date('2022-06-01T17:50:47.671Z'))
        const dateBefore = new DateValue(new Date('2022-06-01T18:50:47.671Z'))
        assert.ok(date.isBefore(dateBefore))
    })
    it('isBefore return false if date is after dateValue or equal', () => {
        const date = new DateValue(new Date('2022-06-01T19:50:47.671Z'))
        const dateBefore = new DateValue(new Date('2022-06-01T18:50:47.671Z'))
       
        assert.equal((date.equals(dateBefore)), false)
    })

    it('isAfter return true if date is after dateValue', () => {
        const date = new DateValue(new Date('2022-06-01T19:50:47.671Z'))
        const dateAfter = new DateValue(new Date('2022-06-01T18:50:47.671Z'))
        assert.ok(date.isAfter(dateAfter))
    })

    it('isAfter return false if date is before dateValue or equal', () => {
        const date = new DateValue(new Date('2022-06-01T19:50:47.671Z'))
        const dateAfter = new DateValue(new Date('2022-06-01T20:50:47.671Z'))
       
        assert.equal((date.isAfter(dateAfter)), false)
    })
})