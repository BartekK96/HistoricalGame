import { ClassConstructor } from "./Immutable";
import { IEqualable } from "./interfaces/IEqualable";

export type SimpleValue = number | string

export class Enum<T extends SimpleValue = SimpleValue> implements IEqualable<Enum> {

    constructor(
        protected value: T
    ) {

    }

    public equals(object: Enum): boolean {
        return this.value === object.value
    }

    public static decorate() {
        return function classDecorator<C extends ClassConstructor<Enum, any[]>>(
            constructor: C
        ) {
            const allowedValues = new Map<SimpleValue, any>();

            for (let propertyKey in constructor) {
                const key:string = (constructor[propertyKey] as any).value

                if (allowedValues.has(key)) {
                    throw new Error(`Duplicate key ${key} in enum ${constructor.name}`)
                }

                allowedValues.set(key, constructor[propertyKey])
            }
        }
    }
}