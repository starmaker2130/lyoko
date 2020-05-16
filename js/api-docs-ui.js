/*
*   -------------------------------------------------
*   .LYOKO USER INTERFACE STRUCT JS COMPILATION TARGET
*   DRAFT SPECIFICATION V 0.3.1
*   AUTHOR: PATRICE-MORGAN ONOLY [@starmaker2130]
*   -------------------------------------------------
*   TARGET DETAILS:
*   NAME: api-docs-ui.js
*   CREATION:
*   LAST MODIFICATION:
*   LAST MODIFICATION: 16.05.12020
*   HOST: @houseofvenus
*/

var Experience = {
    levels: 4,
    compositionTree: [
        {
            id: "main-app-container",
            num: 0,
            classes: [],
            innerMarkup: "",
            parent: [],
            children: [
                "all"
            ],
            level: 0
        },
        {
            id: "page-0-container",
            num: 1,
            classes: [],
            innerMarkup: "",
            parent: [
                0
            ],
            children: [
                2
            ],
            level: 1,
        },
        {
            id: "app-type-selection-container",
            num: 2,
            classes: [],
            innerMarkup: "",
            parent: [
                1
            ],
            children: [
                3,
                4
            ],
            level: 2
        },
        {
            id: "app-type-flat-selection-container",
            num: 3,
            classes: [],
            innerMarkup: "Flat",
            parent: [
                2
            ],
            children: [],
            level: 3
        },
        {
            id: "app-type-immersive-selection-container",
            num: 4,
            classes: [],
            innerMarkup: "",
            parent: [
                2
            ],
            children: [],
            level: 3
        },
        {
            id: "page-1-container",
            num: 1,
            classes: [],
            innerMarkup: "",
            parent: [
                0
            ],
            children: [
                
            ],
            level: 1,
        },
        
    ],
    rawBuild : {
        string: function(){
            return ``
        }
    }
}