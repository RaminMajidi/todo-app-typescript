import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { projectState } from "../states/project-state.js";
import { autobinder } from "../utils/autobinder.js";
import { Component } from "./base-component.js";


  export  class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable{
    
        private project:Project;

        constructor(hostId:string , project:Project){
            super("single-project",hostId,false,project.id)
            this.element.querySelector(".btn-delete")!.id = project.id;
            this.project = project;
            this.renderContent();
            this.configure();
        }

        

        @autobinder
         dragStartHandeler(event: DragEvent): void {
            event.dataTransfer!.setData("text/plain",this.project.id);
            event.dataTransfer!.effectAllowed = "move";
         }
         dragEndHandeler(_event: DragEvent): void {
            
         }
        configure(): void {
           this.element.addEventListener("dragstart",this.dragStartHandeler) 
           this.element.addEventListener("dragend",this.dragEndHandeler)
           this.element.querySelector(".btn-delete")!.addEventListener("click",()=>{
            projectState.deleteProject(this.project.id)
           })
        }
        renderContent(): void {
            this.element.querySelector("h2")!.textContent = this.project.title;
            this.element.querySelector("h3")!.textContent = this.project.pepole.toString();
            this.element.querySelector("p")!.textContent = this.project.description;
        }
    
    }
