/*
*   -------------------------------------------------
*   .LYOKO MAIN THREAD JS COMPILATION TARGET
*   DRAFT SPECIFICATION V 0.3.1
*   AUTHOR: PATRICE-MORGAN ONOLY [@starmaker2130]
*   -------------------------------------------------
*   TARGET DETAILS: FOODID API
*   NAME: api-docs-ui.js
*   CREATION:
*   LAST MODIFICATION: 16.05.12020
*   HOST: @houseofvenus
*/

document.addEventListener("DOMContentLoaded", function(){   // the MAIN runtime funciton or LYOKO-JS
    buildMarkup();
    setTimeout(function(){
        attachButtonHandlers();
    }, 100);
});