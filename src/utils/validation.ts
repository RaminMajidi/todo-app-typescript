
  export  interface Validatable {
        value?: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }
    
   export function Validate(ValidatebleInput: Validatable) {
        let isValid = true;
    
        if (ValidatebleInput.required) {
            isValid = isValid && ValidatebleInput.value?.toString().trim().length !== 0;
        }
    
        if (ValidatebleInput.minLength != null && typeof ValidatebleInput.value === "string") {
            isValid = isValid && ValidatebleInput.value.length >= ValidatebleInput.minLength;
        }
        if (ValidatebleInput.maxLength != null && typeof ValidatebleInput.value === "string") {
            isValid = isValid && ValidatebleInput.value.length <= ValidatebleInput.maxLength;
        }
        if (ValidatebleInput.min != null && typeof ValidatebleInput.value === "number") {
            isValid = isValid && ValidatebleInput.value >= ValidatebleInput.min;
        }
        if (ValidatebleInput.max != null && typeof ValidatebleInput.value === "number") {
            isValid = isValid && ValidatebleInput.value <= ValidatebleInput.max;
        }
        return isValid
    }
