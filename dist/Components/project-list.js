var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ProjectStatus } from "../models/project.js";
import { projectState } from "../states/project-state.js";
import { autobinder } from "../utils/autobinder.js";
import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        projectState.addListener((projects) => {
            const relatedProject = projects.filter(prj => {
                if (this.type === "active") {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relatedProject;
            this.renderProjects();
        });
        this.configure();
        this.renderContent();
    }
    dargOverHandeler(event) {
        event.preventDefault();
        const listElemnt = this.element.querySelector("ul");
        listElemnt.classList.add("droppable");
    }
    dargLeaveHandeler(_event) {
        const listElemnt = this.element.querySelector("ul");
        listElemnt.classList.remove("droppable");
    }
    dropHandeler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        const listElemnt = this.element.querySelector("ul");
        listElemnt.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dargOverHandeler);
        this.element.addEventListener("dragleave", this.dargLeaveHandeler);
        this.element.addEventListener("drop", this.dropHandeler);
    }
    renderProjects() {
        const listElment = document.getElementById(`${this.type}-project-list`);
        listElment.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent = this.type.toUpperCase() + " PROJECTS";
    }
}
__decorate([
    autobinder
], ProjectList.prototype, "dargOverHandeler", null);
__decorate([
    autobinder
], ProjectList.prototype, "dargLeaveHandeler", null);
__decorate([
    autobinder
], ProjectList.prototype, "dropHandeler", null);
//# sourceMappingURL=project-list.js.map