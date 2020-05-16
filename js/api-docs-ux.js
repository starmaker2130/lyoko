/*
*   ---------------------------------------------
*   .LYOKO USER EXPERIENCE JS COMPILATION TARGET
*   DRAFT SPECIFICATION V 0.3.1
*   AUTHOR: PATRICE-MORGAN ONOLY [@starmaker2130]
*   ---------------------------------------------
*   TARGET DETAILS:
*   NAME: api-docs-ux.js
*   CREATION:
*   LAST MODIFICATION: 16.05.12020
*   HOST: @houseofvenus
*/
var Activity = {
    levels: 4,
    compositionTree: [
        {
            id: "main-app-container",
            num: 0,
            type: "container",
            level: 0,
            list: [
               /* {
                    name: "click",
                    method: function(){
                        console.log("0] tapped main app container \n dev view \n author: sm itachi")
                    }
                }, */  
            ]
        },
        {
            id: "page-0-container",
            num: 1,
            type: "container",
            level: 1,
            list: [
                /*{
                    name: "click",
                    method: function(){
                        console.log(" ] 1] tapped page 0 app container \n dev view \n author: sm itachi")
                    }
                },   */
            ]
        },
        {
            id: "app-type-selection-container",
            num: 2,
            type: "container",
            level: 2,
            list: [
                {
                    name: "click",
                    method: function(){
                        console.log(" ] ] 2] tapped app type selection container \n dev view \n author: sm itachi")
                    }
                },   
            ]       
        },
        {
            id: "app-type-flat-selection-container",
            num: 3,
            type: "button-container",
            level: 3,
            list: [
                {
                    name: "click",
                    method: function(){
                        console.log(" ] ] ] 3] tapped app type flat selection container \n dev view \n author: sm itachi");
                        document.getElementById("page-1-container").style.display = "block";
                        
                        document.getElementById("page-0-container").style.opacity = 0;
                        document.getElementById("page-0-container").style.height = 0;
                        
                        document.getElementById("page-1-container").style.opacity = 1.0;
                        document.getElementById("page-1-container").style.height = "100%";
                        
                        setTimeout(function(){
                            document.getElementById("page-0-container").style.display = "none";
                        }, 500);
                    }
                },   
            ]
        },
        {
            id: "app-type-immersive-selection-container",
            num: 4,
            type: "button-container",
            level: 3,
            list: [
                {
                    name: "click",
                    method: function(){
                        console.log(" ] ] ] 3] tapped app type immersive selection container \n dev view \n author: sm itachi")
                    }
                },   
            ]
        },
        
    ]
};

function buildMarkup(){
    for(var i=0; i<Experience.compositionTree.length; i++){ // traverse the markup composition tree
        //TODO: compartamentalize into its own named function declaration
        let childEl = document.createElement("div");        // create a container
        let currentComponent = Experience.compositionTree[i];   // access the current child element JSON description in the composition tree
        let currentActivity = Activity.compositionTree[i];

        // build the component from the retrieved JSON formatted descripter
        childEl.id = currentComponent.id;       // set the container id
        childEl.classes = currentComponent.classes; // set the container classes
        childEl.innerMarkup = currentComponent.innerMarkup; // insert any static textual markup inside the container

        if(currentComponent.level===0){ // if the current child is the main app container 
            document.body.appendChild(childEl); // append it to the body
        }
        else if(currentComponent.level===1 || currentComponent.level===2 || currentComponent.level===3){    // if the current child belongs to any other level of the experience
            document.getElementById(Experience.compositionTree[currentComponent.parent].id).appendChild(childEl);   // append it to its parent if it has one
        }
    }    
}

function attachButtonHandlers(){
// TODO: handle special components that belong on non-zero levels and do not have any parents
    if(Activity.compositionTree.length>0){  // if the list of event listeners on this component is greater than zero
        for(var j=0; j<Activity.compositionTree.length; j++){   //  add the event listeners
            (function(){
                let currentEl = Activity.compositionTree[j];
                console.log(currentEl.id);
                if(currentEl.level>1){  /* 0 = main-app-container, 1 = .page-container [s] */
                    console.log("   imbibed");
                    document.getElementById(currentEl.id).addEventListener(currentEl.list[0].name, currentEl.list[0].method);
                }
                
                
            }());
        }
    }
}