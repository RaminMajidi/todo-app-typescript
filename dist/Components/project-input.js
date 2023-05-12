var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { projectState } from "../states/project-state.js";
import { autobinder } from "../utils/autobinder.js";
import { Validate } from "../utils/validation.js";
import { Component } from "./base-component.js";
export class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptonInputElement = this.element.querySelector("#description");
        this.pepoleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    renderContent() { }
    clearInputs() {
        this.titleInputElement.value = "";
        this.pepoleInputElement.value = "";
        this.descriptonInputElement.value = "";
    }
    getUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptonInputElement.value;
        const enteredPepole = this.pepoleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 3
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 120
        };
        const pepoleValidatable = {
            value: +enteredPepole,
            required: true,
            min: 1,
            max: 10
        };
        if (!Validate(titleValidatable) || !Validate(descriptionValidatable) || !Validate(pepoleValidatable)) {
            alert("Invalid Input,Please try agin !!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPepole];
        }
    }
    submitHandeler(event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, pepole] = userInput;
            projectState.addProject(title, desc, pepole);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandeler);
    }
}
__decorate([
    autobinder
], ProjectInput.prototype, "submitHandeler", null);
//# sourceMappingURL=project-input.js.map