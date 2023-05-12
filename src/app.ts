import { ProjectInput } from "./Components/project-input.js";
import { ProjectList } from "./Components/project-list.js";
import { projectState } from "./states/project-state.js";


window.addEventListener("load",()=>{
   projectState.updateListeners();
})

 new ProjectInput();
 new ProjectList("active");
 new ProjectList("finished"); 
