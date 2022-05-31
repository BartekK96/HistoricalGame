export interface ClassConstructor<C, Args extends Array<any> = any[]> {
    new(...args: Args): C;
}

export function Immutable() {
    return function <T extends ClassConstructor<any, any[]>>(Constructor: T) {
        return class extends Constructor {
            constructor(...args: any[]) {
                super(...args);
                Object.freeze(this);
            }
        }
    }
}