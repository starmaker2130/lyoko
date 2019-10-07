document.addEventListener("DOMContentLoaded", function(){
    initScene();
    sessionManager.connection = io.connect(location.host);

    
});
