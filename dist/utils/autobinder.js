export function autobinder(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const myDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return myDescriptor;
}
//# sourceMappingURL=autobinder.js.map