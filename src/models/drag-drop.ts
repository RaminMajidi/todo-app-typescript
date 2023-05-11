
  export  interface Draggable {
        dragStartHandeler(event:DragEvent):void;
        dragEndHandeler(event:DragEvent):void;
    }
    
   export interface DragTarget{
        dargOverHandeler(event:DragEvent):void;
        dropHandeler(event:DragEvent):void;
        dargLeaveHandeler(event:DragEvent):void;
    }
