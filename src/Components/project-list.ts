import { DragTarget } from "../models/drag-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { projectState } from "../states/project-state.js";
import { autobinder } from "../utils/autobinder.js";
import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";

   export class ProjectList extends Component<HTMLDivElement,HTMLFormElement> implements DragTarget {
     
        assignedProjects: Project[] = [];
        constructor(private type: 'active' | 'finished') {
            super("project-list","app",false,`${type}-projects`)
            projectState.addListener((projects: Project[]) => {
                const relatedProject = projects.filter(prj => {
                    if (this.type === "active") {
                        return prj.status === ProjectStatus.Active;
                    }
                    return prj.status === ProjectStatus.Finished;
                })
                this.assignedProjects = relatedProject;
                this.renderProjects();
                
            })
            this.configure();
            this.renderContent();
        }
    
        @autobinder
        dargOverHandeler(event: DragEvent): void {
            event.preventDefault();
            const listElemnt = this.element.querySelector("ul")!;
            listElemnt.classList.add("droppable")
        }
    
        @autobinder
        dargLeaveHandeler(_event: DragEvent): void {
            const listElemnt = this.element.querySelector("ul")!;
            listElemnt.classList.remove("droppable")
        }
        @autobinder
        dropHandeler(event: DragEvent): void {
            const prjId = event.dataTransfer!.getData("text/plain")
            projectState.moveProject(prjId,this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
            const listElemnt = this.element.querySelector("ul")!;
            listElemnt.classList.remove("droppable")
        }
        
        configure(): void {
            this.element.addEventListener("dragover",this.dargOverHandeler);
            this.element.addEventListener("dragleave",this.dargLeaveHandeler);
            this.element.addEventListener("drop",this.dropHandeler);
        }
    
        private renderProjects() {
            const listElment = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
            listElment.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector("ul")!.id,prjItem)
            }
        }
         renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector("ul")!.id = listId;
            this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
        }
    
    }
