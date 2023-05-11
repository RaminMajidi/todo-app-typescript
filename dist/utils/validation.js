export function Validate(ValidatebleInput) {
    var _a;
    let isValid = true;
    if (ValidatebleInput.required) {
        isValid = isValid && ((_a = ValidatebleInput.value) === null || _a === void 0 ? void 0 : _a.toString().trim().length) !== 0;
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
    return isValid;
}
//# sourceMappingURL=validation.js.map