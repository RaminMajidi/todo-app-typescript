import { Project, ProjectStatus } from "../models/project.js";

    type Listener<T> = (items: T[]) => void;
    
    class State<T>{
        protected listeners:Listener<T>[] = [];
        addListener(listenerFn:Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }
    
    class ProjectState extends State<Project> {
        
        private projects: Project[] = [];
        private static instanse: ProjectState;
        private constructor() {
            super()
        }
    
        static getInstance() {
            if (this.instanse) {
                return this.instanse;
            }
            this.instanse = new ProjectState();
            return this.instanse;
        }
    
        addProject(title: string, description: string, numOfPepole: number) {
            const newProject = new Project(
                Math.floor(Math.random()*1000).toString(),
                title,
                description,
                numOfPepole,
                ProjectStatus.Active)
    
            this.projects.push(newProject);
            this.updateListeners();
           
        }
    
        moveProject(projectId:string,newStatus:ProjectStatus){
            const project = this.projects.find(prj => prj.id === projectId);
            if(project){
                project.status = newStatus;
                this.updateListeners()
            }
        }
    
        private updateListeners(){
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }

   export const projectState = ProjectState.getInstance();
