import { HttpException, HttpStatus } from "@nestjs/common";
import { Immutable } from "./decorators/Immutable";
import { IEqualable } from "./interfaces/IEqualable";

export type ISODate = string;

@Immutable()
export class DateValue implements IEqualable<DateValue>{
    static readonly MILLISECOND = 1;
    static readonly SECOND = 1000;
    static readonly MINUTE = 60 * DateValue.SECOND;
    static readonly HOUR = 3600 * DateValue.SECOND;
    static readonly DAY = 24 * DateValue.HOUR;

    private static ISO8601_RE = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
    private value: Date | null;

    constructor(date: Date | string | null) {
        if (date instanceof Date) {
            this.value = new Date(date.getTime());
        } else if (typeof date === 'string' && DateValue.ISO8601_RE.test(date)) {
            this.value = new Date(date);
        } else if (date === null) {
            this.value = null;
        } else {
            throw new HttpException('Invalid date format', HttpStatus.NOT_ACCEPTABLE);
        }

        if (!this.isNullable()) {
            if (this.value && this.value.toString() === 'Invalid Date') {
                throw new HttpException(`Invalid date error for value`, HttpStatus.NOT_ACCEPTABLE);
            }
        }
    }

    public toISOString(): ISODate {
        if (!this.value) {
            throw new HttpException('Date value is nullable', HttpStatus.NOT_ACCEPTABLE);
        }

        return this.value.toISOString();
    }

    private isNullable() {
        return this.value === null;
    }

    public equals(other: DateValue): boolean {
        if (this === other) {
            return true;
        }

        if (!(other instanceof DateValue)) {
            return false;
        }

        if (other.value && this.value) {
            return other.value.getTime() === this.value.getTime();
        }

        throw new HttpException('Invalid date format', HttpStatus.NOT_ACCEPTABLE);

    }

    /**
     * @deprecated use time service
     */
    public static now(): DateValue {
        return new DateValue(new Date())
    }

    public isBefore(other: DateValue): boolean {
        if (this.isNullable() || other.isNullable()) {
            throw new Error('Comparing nullable dates');
        }
        return this.toDate().getTime() < other.toDate().getTime();
    }

    public isAfter(other: DateValue): boolean {
        return !this.equals(other) && !this.isBefore(other);
    }

    private toDate(): Date {
        if (!this.value) {
            throw new Error('Date value is nullable');
        }

        return new Date(this.value);
    }

    public hasAlreadyPassed(): boolean {
        if (!this.value) {
            throw new Error('Can not check if null date is already passed')
        }
        return this.value.getTime() < Date.now();
    }

    static after(milliseconds: number): DateValue {
        const currentTs = new Date();
        return new DateValue(new Date(currentTs.getTime() + milliseconds));
    }


    static before(milliseconds: number): DateValue {
        return this.after(-milliseconds);
    }
}