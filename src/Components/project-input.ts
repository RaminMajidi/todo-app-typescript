import { projectState } from "../states/project-state.js"
import { autobinder } from "../utils/autobinder.js";
import { Validatable, Validate } from "../utils/validation.js";
import { Component } from "./base-component.js";

   export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptonInputElement: HTMLInputElement;
        pepoleInputElement: HTMLInputElement;
    
        constructor() {
            super("project-input","app",true,"user-input")
            this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
            this.descriptonInputElement = this.element.querySelector("#description") as HTMLInputElement;
            this.pepoleInputElement = this.element.querySelector("#people") as HTMLInputElement;
            this.configure();
        }
    
        renderContent(): void {}
    
        private clearInputs() {
            this.titleInputElement.value = "";
            this.pepoleInputElement.value = "";
            this.descriptonInputElement.value = "";
        }
    
        private getUserInput(): [string, string, number] | void {
    
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptonInputElement.value;
            const enteredPepole = this.pepoleInputElement.value;
    
    
            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true,
                minLength: 3
            };
    
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
                maxLength: 120
            }
    
            const pepoleValidatable: Validatable = {
                value: +enteredPepole,
                required: true,
                min: 1,
                max: 10
            }
    
    
            if (!Validate(titleValidatable) || !Validate(descriptionValidatable) || !Validate(pepoleValidatable)) {
                alert("Invalid Input,Please try agin !!");
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPepole];
            }
        }
    
        @autobinder
        private submitHandeler(event: Event) {
            event.preventDefault();
            const userInput = this.getUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, pepole] = userInput;
                projectState.addProject(title, desc, pepole);
                this.clearInputs();
            }
        }
    
         configure() {
            this.element.addEventListener("submit", this.submitHandeler)
        }
    }
