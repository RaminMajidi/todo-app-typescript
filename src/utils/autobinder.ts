
   export function autobinder(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const myDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        }
        return myDescriptor
    }
