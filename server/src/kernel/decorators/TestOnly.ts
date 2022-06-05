export function TestOnly() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (process.env.NODE_ENV !== 'testing') {
            descriptor.value = function () {
                throw new Error(`Test method can be used only in testing environment - ${propertyKey}`)
            }
        }
    };
}