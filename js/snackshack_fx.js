/*"use strict";
/*eslint no-undef: "error"*/
/*eslint-env node*/
/*global document, window, navigator*/
/*eslint no-console: ["error", { allow: ["log"] }] */
/*eslint no-unused-vars: "error"*/

/* github edition */
var video, videoSelect;

function UserChannel(socket){
    self = this;
    this.socket = {
        obj: socket,// /*0*/ add time stamp instead
        print: function(){
            console.log(self.socket.obj)
        }
    }
}

function gotDevices(deviceInfos) {
    videoSelect = document.getElementById("videoSource");
    for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement("option");
        option.value = deviceInfo.deviceId;

        console.log("["+i+"] "+deviceInfo.kind);

        if (deviceInfo.kind === "videoinput") {
            option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
            videoSelect.appendChild(option);
        }
        else {
           // console.log("Found one other kind of source/device: ", deviceInfo);
        }
    }
}

function getStream() {
    videoSelect = document.getElementById("videoSource");
    //console.log(videoSelect.value);

    if (window.stream) {
       // console.log("stream flowing my guy!!!");
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }

    var constraints = {
        video: {
            deviceId: {exact: videoSelect.value}
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    video.srcObject = stream;
    video.play();
}

function handleError(error) {
    console.log("Error: ", error);
}

function convertCanvasToImage(canvas) {// store the result of this function in a variable that will represent the file entered in line 57 above
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

var applicationClientManager = {
    focus: 0,
    menu: {
        currentlyOpen: -1, //=none; 0 = add/edit object; 1 = ; 2 = code;
    },
    builder: {
        orientation: null,
        addingModel: false,
        addModelFromSource: null,
        scale: null
    },
    entity: {
        id: "default-mask",
        geometry: {
            primitive: "sphere",
            radius: 0.5
        },
        position: "0 1 -5",
        material: "src: #floor-texture"
    },
    connection: null
};

function startWebCam(){ // starts the webcam or phone camera capture

    video = document.getElementById("video");
    videoSelect = document.querySelector("select#videoSource");
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
       navigator.mediaDevices.enumerateDevices().then(gotDevices).then(getStream).catch(handleError);

        videoSelect.onchange = getStream;
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.margin = "0"
        video.style.top = "0";
        video.style.left = "0";

        let scene = document.getElementById("experience-overlay-container");
        scene.style.width = "100%";
        scene.style.height = "100%";
        scene.style.margin = "0"
        scene.style.top = "0";
        scene.style.left = "0";

    }
}

function init(){
  console.log(`------------------------- \n SNACK SHACK \n -------------------------- \n a decentralized immersive application for autonomous delivery and late night convenience \n first published on the HOUSEOFVENUS pARk \n current version: 0.5.22`);

  applicationClientManager.connection = io.connect(location.host);

  applicationClientManager.connection.emit("requestDIAStream", {status: true, name: "SNACKSHACK"});

  applicationClientManager.connection.on("selectNewPage", function(data){
      var x = document.getElementsByClassName("application-asset");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].object3D.visible = false;
      }

      if(data.status){
          console.log(` fx] selectNewPage \n activate application assets for page ${data.page}`);

          let selection = parseInt(data.page, 10);

          var y = document.getElementsByClassName(`application-page-${selection}-asset`);
          var j;
          for(j = 0; j < y.length; j++){
              y[j].object3D.visible = true;
          }
      }
  });

  applicationClientManager.connection.on("clearInitialVideoFeed", function(data){
      var video = document.getElementById("video");
      let stream = video.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(function(track) {
          track.stop();
      });

      video.srcObject = null;
      //video.stop();
      video.style.display = "none";
  });

  applicationClientManager.connection.on("restartVideoFeed", function(data){
      getStream();
      //video.stop();
      video.style.display = "block";
  });

  applicationClientManager.connection.on("transitionToBuildView", function(data){
      $("#object-type-list-container").css({
          display: "block"
      }).animate({
          opacity: 1.0
      }, 500, function(){
          $("#object-type-list-container").on("change", function(){
              var value = document.querySelector("select#object-type-list-container").value;
              console.log(value);
          })
      });
  });

  applicationClientManager.connection.on("selectionMadeForDeliveryItem", function(data){
      let selection = data.selection;
      //let selectedPos = document.querySelector(selection).object3D.position;

      if(selection=="#menu-option-0"){
          document.querySelector("#selected-option").object3D.position.set(-2, 2.2, -4);
      }
      else if(selection=="#menu-option-1"){
          document.querySelector("#selected-option").object3D.position.set(2, 2.2, -4);
      }
      document.querySelector(selection).object3D.visible = false;
      //document.querySelector("#selected-option").object3D.position.set(selectedPos);
      document.querySelector("#selected-option").object3D.visible = true;
  });

  applicationClientManager.connection.on("paintCanvas", function(data){
      var arr = new Uint8ClampedArray(data.buf); //buffer

      const imgData = new ImageData(
        arr,
        data.cols,
        data.rows
      );
      // set canvas dimensions
      const canvas = document.getElementById("canvas");
      canvas.height = data.rows;
      canvas.width = data.cols;
      // set image data
      const ctx = canvas.getContext("2d");
      ctx.putImageData(imgData, 0, 0);/**/
  });

  startWebCam();
}
