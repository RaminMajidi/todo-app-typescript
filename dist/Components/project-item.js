var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { projectState } from "../states/project-state.js";
import { autobinder } from "../utils/autobinder.js";
import { Component } from "./base-component.js";
export class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.element.querySelector(".btn-delete").id = project.id;
        this.project = project;
        this.renderContent();
        this.configure();
    }
    dragStartHandeler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandeler(_event) {
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandeler);
        this.element.addEventListener("dragend", this.dragEndHandeler);
        this.element.querySelector(".btn-delete").addEventListener("click", () => {
            projectState.deleteProject(this.project.id);
        });
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.project.pepole.toString();
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    autobinder
], ProjectItem.prototype, "dragStartHandeler", null);
//# sourceMappingURL=project-item.js.map