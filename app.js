// author(s):  Patrice-Morgan Ongoly
// version: 0.2.2
// last modified: Monday, July 2, 2018 12:32 EST
// description:

// required modules
var bodyParser = require('body-parser');
var express = require('express');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var WhichBrowser = require('which-browser');
// main application instance

var app = express();

// main application settings

var config = {
    PORT: process.env.PORT || 8008,
    DIRECTORY: [
        './',           /* 0 */
        './css',        /* 1 */
        './js',         /* 2 */
        './media/texture',  /* 3 */
        './media/gifs', /* 4 */
        './media/pattern', /* 5 */
        './media/img',  /* 6 */
        './media/sounds',   /* 7 */
        './media/model',    /* 8 */
        './uploads',        /* 9 */
        './drafts/docs',       /* 10 */
        './media/upload',       /* 11 */
        './media/room',         /* 12 */
        './media/img/bg',       /* 13 */
        './media/room/media/model', /* 14 */
        './board/',             /* 15 */
    ]
};

var deviceType = 'unknown';
let dir = config.DIRECTORY;

var terminalOutputViewers = [];
var terminals = [];
var objectsInSceneHandler = {
    points: [],
    adding: false,
    saveLastVertex: false,
    gestureInterval: null,
    starter: null,
    webcam: null,
    objectList: [],
    build: {
        markup: ''
    }
};

var io = require('socket.io').listen(app.listen(config.PORT, function(){
    console.log('connecting \n . \n .. \n ... \n .... \n ..... \n ------------------------------------------');
    console.log('    HOUSE OF VENUS, BENEFIT CORPORATION \n PUBLIC AUGMENTED REALITY KINECTOME Draft Serialization v 0.5.0 ');
    console.log('------------------------------------------');
    console.log(`[0] listening on port ${config.PORT}`);
    console.log('------------------------------------------');

}));

var SNACKSHACK = {
    type: 'DecentralizedImmersiveApplication',
    ATOWN: {
        ENVIRONMENT: {
            HyperRealSpace: {
                Boundary: {
                    spline: null,
                    origin: {
                        latitude: null,
                        longitude: null,
                    },
                    zips: [

                    ],
                    area: 0
                }
            },
            LedgerSpace: {
                capacity: 1024, //GB, i.e. 1 TB
                upperBound : {
                    alpha: 9, //how many full time ARias should be committed to this DIA running at maximum capacity and processing power load?
                    beta: 1024, //how much full time cARd traffic should be allotted to this DIA running at maximum capacity and processing power load (recommended 1GB per cARd for this)?
                }
            },
            Community: {
                Members: {

                },
            }
        },
        OBJECTSUBJECTS: {

        },
        SUBJECTOBJECTS: {
            Views: {

            }
        },
        SELECTORS: {

        },
        EFFECTORS: {
            GRIO: {
                type: 'GeneralResponseInputOutput',
                connect: function(){
                    console.log(' ~~~~~~~~~~~ \n GRIO Controller linked to SNACK SHACK DIA');
                },
                select: function(option){

                }
            }
        }
    },
};

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('/'));

app.get('/', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    if(result.isType('desktop')){
        console.log('This is a desktop computer.');
        deviceType = 'desktop';
    }
    else{
        console.log('This is a mobile device.');
        deviceType = 'mobile';
    }

    res.render('snackshack.html',{root: dir[0]});
});

app.get('/contest', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    if(result.isType('desktop')){
        console.log('This is a desktop computer.');
        deviceType = 'desktop';
    }
    else{
        console.log('This is a mobile device.');
        deviceType = 'mobile';
    }

    res.render('race.html',{root: dir[0]});
});

app.get("/treehouse", function(req, res){
  var result = new WhichBrowser(req.headers);
  console.log(result.toString());
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("--------- HOUSE OF VENUS ---------");
  console.log("-- TreeHouse Distributed Ledger --");
  console.log("--         version 0.0.1        --");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("-- loading...                   --");
  console.log("-- connected to TreeHouse       --");
  console.log("-- hand visualizer enabled      --");
  console.log("-- opening Lyoko Exchange...    --");
  console.log("-- .....                        --");
  console.log("-- ....                         --");
  console.log("-- ...                          --");
  console.log("-- ..                           --");
  console.log("-- .                            --");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("-- Ready!                       --");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("----------------------------------");

  res.render("hand_sample.html", {root: dir[0]});
});


app.get("/augr", function(req, res){
  var result = new WhichBrowser(req.headers);
  console.log(result.toString());

  console.log("hand visualizer connected");

  res.render("augrstudio.html", {root: dir[0]});
});

app.get("/hand", function(req, res){
  var result = new WhichBrowser(req.headers);
  console.log(result.toString());

  console.log("hand visualizer connected");

  res.render("hand.html", {root: dir[0]});
});

app.get("/plugins", function(req, res){
  var result = new WhichBrowser(req.headers);
  console.log(result.toString());

  console.log("hand visualizer connected");

  res.render("plugins.html", {root: dir[0]});
});

app.get("/arrows", function(req, res){
  var result = new WhichBrowser(req.headers);
  console.log(result.toString());

  console.log("arrows hand visualizer connected");

  res.render("arrows.html", {root: dir[0]});
});

app.get('/terminal', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    console.log(`~~~~~~~~~~~~~~~~~~~\n         LYOKO TERMINAL \n~~~~~~~~~~~~~~~~~~~\n 6.11.19 | 20904     \n ~~~~~~~~~~~~~~~~~~~`);

    res.render('terminal.html',{root: dir[0]});
});

app.get('/output', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    console.log(`~~~~~~~~~~~~~~~~~~~\n         LYOKO OUTPUT VIEWER \n~~~~~~~~~~~~~~~~~~~\n 6.11.19 | 20904     \n ~~~~~~~~~~~~~~~~~~~`);

    res.render('output.html',{
        root: dir[0]
    });
});

app.get("/template", function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    
    console.log("viewing template");
    res.render("template.html", {root: dir[0]});
});

/*boards*/

app.get('/grio', function(req, res){
    var result = new WhichBrowser(req.headers);
    console.log(result.toString());
    if(result.isType('desktop')){
        console.log(`-------------------- GRIO -------------------- \n v. 0.1.0 \n accessed on desktop. \n setting: 1 \n author: Patrice-Morgan Ongoly `);
    }
    else{
        console.log(`-------------------- GRIO -------------------- \n v. 0.1.0 \n accessed on mobile. \n setting: 0 (default) \n author: Patrice-Morgan Ongoly `);
    }
    res.render('grio.html',{root: dir[0]});
});

/**/

app.get('/css/:stylesheet_id', function(req, res){
    let stylesheet_id = req.params.stylesheet_id;
    res.sendFile(stylesheet_id, {root: dir[1]});
});

app.get('/js/:script_id', function(req, res){
    var script_id = req.params.script_id;
    res.sendFile(script_id, {root: dir[2]});
});

app.get('/media/texture/:texture_id', function(req, res){
    var texture_id = req.params.texture_id;
    res.sendFile(texture_id, {root: dir[3]});
});

app.get('/media/gifs/:gif_id', function(req, res){
    var gif_id = req.params.gif_id;
    res.sendFile(gif_id, {root: dir[4]});
});

app.get('/media/pattern/:pattern_id', function(req, res){
    var pattern_id = req.params.pattern_id;
    res.sendFile(pattern_id+'.patt', {root: dir[5]});
});

app.get('/media/img/:img_id', function(req, res){
    var img_id = req.params.img_id;
    res.sendFile(img_id, {root: dir[6]});
});

app.get('/media/sounds/:sound_id', function(req, res){
    var sound_id = req.params.sound_id;
    res.sendFile(sound_id, {root: dir[7]});
});

app.get('/media/model/:model_id', function(req, res){
    var model_id = req.params.model_id;
    res.sendFile(model_id, {root: dir[8]});
});

app.get('/uploads/:upload_id', function(req, res){
    var upload_id = req.params.upload_id;
    res.sendFile(upload_id, {root: dir[9]});
});

io.sockets.on('connection', function(socket){
    console.log(`client connected at ${socket.id}`);
    //var conn = socket;

    // applicationClient sockets
    socket.on('requestDIAStream', function(data){

        if(data.status){
            SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[socket.id] ={
                id: socket.id,
                type: 'ApplicationClient',
                originName: data.name,
                origin: socket,
                code: socket.id,
                Members: {

                }
            };

            console.log(` ~~~~~~~~~~ \n fx requestDIAStream \n type: appClientRequest \n applicationClient for ${socket.id} \n code ${SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[socket.id].code} \n`);

        }
    });

    // client sockets
    socket.on('checkDeviceType', function(data){
        socket.emit('loadDeviceType', {type: deviceType});
    });

    socket.on('createScene', function(data){
        var ori = data.orientation;

        socket.emit('clearInitialVideoFeed', {status: 1});

        switch(ori){
            case 0: // landmark oriented
                landmarkTrackingTest(socket);
                break;
            case 1: // face oriented
                //facialRecognitionTest(socket, 0, 100);
                facialRecognitionTest(socket, 1, 250);
                break;
            case 2: // hand oriented
                //gestureTrackingTest(socket, 0, 100);
                gestureTrackingTest(socket, 1, 250);
                //gestureTrackingTest(socket, 1, 1000);
                break;
            default:
                console.log('no associated orientation found');
                break;
        }

        socket.emit('transitionToBuildView', {buildType: ori});
    });

    socket.on("disconnectGRIO", function(data){
        console.log(` ~~~~~~~~~~ \n fx disconnectGRIO \n type: void \n manager ${socket.id} now disconnected from View ${data.code} \n`);
        console.log(SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[data.code].Members);
        delete SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[data.code].Members[socket.id];
    });

    socket.on('connectGRIO', function(data){
        if(data.status){
            SNACKSHACK.ATOWN.EFFECTORS.GRIO.connect();
            let views = Object.keys(SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views);
            let Viewers = SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views;
            let connected = false;
            let connCode = null;

            for(let i = 0; i<views.length; i++){
                let currentView = Viewers[views[i]];
                let memberCount = Object.keys(currentView.Members).length;


                if(memberCount>0){
                    continue;
                }
                else{
                    Viewers[views[i]].Members[socket.id] = {
                        id: socket.id,
                        onPage: 0,
                        code: currentView.code
                    }
                    connCode = currentView.code;
                    connected = true;
                }
            }

            if(connected){
                console.log(` ~~~~~~~~~~ \n fx connectGRIO \n type: void; initial connection \n manager ${socket.id} now connected to View ${connCode} \n`);
                socket.emit('applicationSuccessfullyConnectedToGRIO', {status: true, code: connCode});
            }
            else{
                console.log(` ~~~~~~~~~~ \n fx connectGRIO \n type: refused \n manager ${socket.id} cannot be attached as there are no available Views \n`);
                socket.emit('applicationSuccessfullyConnectedToGRIO', {status: false});
            }


        }
        else{
            if(data.statusCode!=null){

            }
        }
    });

    socket.on('handleGRIOEvent', function(data){
        if(data.status){
            if(data.eventType=="pageChange"){
                let transitionData = data.target;
                SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[transitionData.code].Members[socket.id].onPage = transitionData.page;
                 SNACKSHACK.ATOWN.SUBJECTOBJECTS.Views[transitionData.code].origin.emit('selectNewPage', {status: true, page: transitionData.page});

                console.log(` ~~~~~~~~~~ \n fx handleGRIOEvent \n type: pageChange \n manager : ${socket.id} \n View ${transitionData.code} \n now on application page ${transitionData.page} \n`);
            }
        }
    });

    socket.on("CLIENTconnectOutputViewerToTerminalSERVER", function(data){
        if(data.status){
            if(terminals.length==0){
                socket.emit("SERVERopenNewTerminalForViewerCLIENT", {status: true});
            }
            terminalOutputViewers.push({pointer: socket});
            console.log(terminalOutputViewers);
        }
    });

    socket.on("CLIENTconnectHandToDroneSERVER", function(data){
        if(data.status){
            SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV = {
                type: "EulaliesVoyager",
                connect: function(){
                    console.log('connected to eV');
                },
                move: function(direction, speed){
                    let self = this;
                    console.log(`move ${direction} at speed ${self.core.speed} units`);
                },
                core: {
                    position: [
                        0,
                        0,
                        0
                    ],
                    heading: "landed",
                    speed: 10
                }
            };

            SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.connect();

            socket.emit("SERVERhandleClientLinkRequestCLIENT", {status: true, drone:
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core});
        }
    });

    socket.on("CLIENTrequestDroneMovementSERVER", function(data){
        if(data.status){
            let direction = data.direction;
            let speed = SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.speed;
            switch(direction){
                case "land":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "land"){
                        console.log(`land.`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "land"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "land";
                    }
                break;
                case "takeoff":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "takeoff"&&SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hoverstop"){
                        console.log(`takeoff.`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "takeoff"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "takeoff";
                    }
                break;
                case "right":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "right"){
                        console.log(`move drone right at ${speed}`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "right"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "right";
                    }
                break;
                case "left":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "left"){
                        console.log(`move drone left at ${speed}`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "left"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "left";
                    }
                    break;
                case "forward":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "forward"){
                        console.log(`move drone forward at ${speed}`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "forward"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "forward";
                    }
                    break;
                case "back":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "back"){
                        console.log(`move drone backward at ${speed}`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "back"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "back";
                    }
                    break;
                case "up":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "up"){
                        console.log(`move drone up at ${speed}`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "up"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "up";
                    }
                    break;
                case "down":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "down"){
                        console.log(`move drone down at ${speed}`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "down"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "down";
                    }
                    break;
                case "hover":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hover"){
                        console.log(`drone stopped...\nset to hover.`);
                        
                        socket.emit("SERVERsendDroneMovementResponseToCLIENT", {
                            status: true,
                            response: "hover"
                        });
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "hover";
                    }
                    break;
                case "hoverstop":
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hover"){
                        console.log(`drone stopped...\nset to hover.`);
                        //let countValue = 5;
                        /*  let countDownToLanding = setInterval(function(){
                            console.log(`${countValue}...`);
                            countValue--;
                            if(countValue==-1){
                                clearInterval(countDownToLanding);
                                SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "landed";
                            }
                        }, 1000);*/
                        
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "hover";
                    }
                    break;
                default:
                    if(SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading != "hover"){
                        console.log(`drone instructed not to move.`);
                        SNACKSHACK.ATOWN.OBJECTSUBJECTS.EV.core.heading = "hover";
                    }
                    console.log(`remain still...\ndrone set to hover.`);
                    break;
            }
        }
    });

    socket.on("CLIENTupdateLyokoSessionSERVER", function(data){
        console.log("[function called] xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("[function  start] CLIENT -- update lyoko session --> SERVER");
        if(data.status){
            let target = data.target;
            let request = data.request;
            console.log(`[function branch] ---------------------------`);
            console.log(`[function branch] Requesting "${request}" mode for ${target}`);
            console.log(`[function branch] ---------------------------`);
            console.log(`[ function  end ] xxxxxxxxxxxxxxxxxxxxxxxxxxx`);
            if(request=="new"||request=="addphrase"){
                broadcastRequestToClients(request, socket, null, null);
            }
        }
    });

    socket.on("CLIENTupdatePhraseAndSemanticAnalysisSERVER", function(data){
        console.log("[function called] xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("[function  start] CLIENT -- update phrase and semantic analysis --> SERVER");
        if(data.status){
            let rawSemanticInput = data.semantics;
            let rawPhraseInput = data.phrase;
            let target = data.target;
            let request = data.request;

            console.log(`[function branch] ---------------------------`);
            console.log(`[function branch]        semantics`);
            console.log(`[function branch] ---------------------------`);
            console.log(rawSemanticInput);
            console.log(`[function branch] ---------------------------`);
            console.log(`[function branch]         phrases`);
            console.log(`[function branch] ---------------------------`);
            console.log(rawPhraseInput);
            console.log(`[function branch] ---------------------------`);
            console.log(`[ function  end ] xxxxxxxxxxxxxxxxxxxxxxxxxxx`);
            if(request=="new"||request=="addphrase"){
                broadcastRequestToClients(request, socket, rawSemanticInput, rawPhraseInput);
            }
        }
    });

    socket.on('disconnect', function(){
        console.log(`socket ${socket.id} disconnected.`);
    });
});

function broadcastRequestToClients(request, origin, semantics, phrase){
    if(terminalOutputViewers.length==0){
        origin.emit("SERVERdenyUnauthorizedAccessCLIENT", {status: true, code: "missing output", message: "please open a terminal output viewer first"});
    }
    else{
        for(var w=0; w<terminalOutputViewers.length; w++){
            (function(){
                terminalOutputViewers[w].pointer.emit("BROADCASTupdateLyokoSessionRESULT", {status: true, request: request, semantics: semantics, phrase: phrase, target: "default", hostID: terminalOutputViewers[w].pointer.id});
            })();
        }
    }
}

function compileObjectMarkup(item, markup){ //, experienceBuilder
    var objectMarkup = markup;
    var i = item;
    var colorArr = [
        'yellow',
        'green',
        'blue',
        'red',
        'purples',
        'orange'
    ];

    var objectOrigin = objectsInSceneHandler.points[i];

    var filter = {
        x: objectOrigin.x/100,
        y: objectOrigin.y/100,
        z: 0
    };

    var defaultModelMarkup = `<a-entity obj-model="obj: url(media/model/eiffel-tower.obj); mtl: url(media/model/eiffel-tower.mtl)" scale="0.05 0.05 0.05" position="${filter.x} ${filter.y} ${filter.z}"></a-entity>`;

    var objectName = objectsInSceneHandler.objectList[i].type;

    var objectGeometryLib = {
        'sphere': `<a-sphere color="${colorArr[i]}" position="${filter.x} ${filter.y} ${filter.z}" radius="1"></a-sphere>`,
        'tetra': `<a-tetrahedron color="${colorArr[i]}" position="${filter.x} ${filter.y} ${filter.z}" radius="1"></a-tetrahedron>`,
        'cube': `<a-box color="${colorArr[i]}" position="${filter.x} ${filter.y} ${filter.z}"  depth="1" height="1" width="1"></a-box>`,
        'model': null
    };

    if(objectName=='model'){
        var modelSource = objectsInSceneHandler.objectList[i].src;
        var modelScale = objectsInSceneHandler.objectList[i].scale;

        defaultModelMarkup = `<a-entity obj-model="obj: url(${modelSource});" scale="${modelScale}" color="${colorArr[i]}" position="${filter.x} ${filter.y} ${filter.z}"></a-entity>`;

        console.log(`adding model located at ${modelSource} with scale ${modelScale}`);
    }

    objectGeometryLib.model = defaultModelMarkup;

    objectMarkup += objectGeometryLib[objectName];
    return objectMarkup;
}

function buildUserARExperience(){   //experienceBuilder
    //var builder = experienceBuilder;
    //console.log('TODO: build user ar experience');
    var objectMarkup = '';

    for(var i=0; i<objectsInSceneHandler.points.length; i++){
        objectMarkup = compileObjectMarkup(i, objectMarkup);    //, builder
    }


    var markup = objectMarkup+`
            <!--<a-entity id='floor'
                      geometry='primitive: plane; width: 100; height: 100;'
                      material='src: #floor-texture; repeat: 100 100;'
                      position='0 0 0'
                      rotation='-90 0 0'>
            </a-entity>-->

            <a-entity position="3 1.5 5">
                <a-entity camera="active: true" look-controls wasd-controls></a-entity>
            </a-entity>

            <a-sky material='transparent: true; opacity: 0; color: white;'></a-sky>`

    // save markup into actual file
    /*fs.writeFile(dir[12]+'/temp.html', markup, function (err) {
        if (err) {
            return console.log('there is an error building the markup');
        }

        console.log('the markup file was saved');
    });*/
    //write the file after the experience name is approved

    return markup;
}

function landmarkTrackingTest(source){
    var channel = source;
    console.log('launch landmark orientation handling function');
    console.log(channel.id);
    gestureTrackingTest(channel, 0, 100);
}

function gestureTrackingTest(source, target, renderRate){

    var delayInterval = renderRate;
    var objectTarget = target;
    var socket = source;

    console.log('TODO: add gesture tracking test');

    const cv = require('opencv4nodejs');

    const skinColorUpper = hue => new cv.Vec(hue, 0.8 * 255, 0.6 * 255);
    const skinColorLower = hue => new cv.Vec(hue, 0.1 * 255, 0.05 * 255);

    const devicePort = 0;

    objectsInSceneHandler.webcam = new cv.VideoCapture(devicePort);
    const wCap = objectsInSceneHandler.webcam;


    const makeHandMask = function(img){
      // filter by skin color
        const imgHLS = img.cvtColor(cv.COLOR_BGR2HLS);
        const rangeMask = imgHLS.inRange(skinColorLower(0), skinColorUpper(15));

      // remove noise
        const blurred = rangeMask.blur(new cv.Size(10, 10));
        const thresholded = blurred.threshold(200, 255, cv.THRESH_BINARY);

        return thresholded;
    };

    const getHandContour = function(handMask){
        const contours = handMask.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      // largest contour
        return contours.sort((c0, c1) => c1.area - c0.area)[0];
    };

    const getRoughHull = function(contour, maxDist) {
  // get hull indices and hull points
        const hullIndices = contour.convexHullIndices();
        const contourPoints = contour.getPoints();
        const hullPointsWithIdx = hullIndices.map(idx => ({
            pt: contourPoints[idx],
            contourIdx: idx
        }));

        const hullPoints = hullPointsWithIdx.map(ptWithIdx => ptWithIdx.pt);

  // group all points in local neighborhood

        const ptsBelongToSameCluster = (pt1, pt2) => ptDist(pt1, pt2) < maxDist;
        const { labels } = cv.partition(hullPoints, ptsBelongToSameCluster);
        const pointsByLabel = new Map();
        labels.forEach(l => pointsByLabel.set(l, []));

        hullPointsWithIdx.forEach((ptWithIdx, i) => {
            const label = labels[i];
            pointsByLabel.get(label).push(ptWithIdx);
        });

  // map points in local neighborhood to most central point

        const getMostCentralPoint = function(pointGroup) {
        // find center
            const center = getCenterPt(pointGroup.map(ptWithIdx => ptWithIdx.pt));
        // sort ascending by distance to center
            return pointGroup.sort((ptWithIdx1, ptWithIdx2) => ptDist(ptWithIdx1.pt, center) - ptDist(ptWithIdx2.pt, center))[0];
        };
        const pointGroups = Array.from(pointsByLabel.values());
      // return contour indices of most central points
        return pointGroups.map(getMostCentralPoint).map(ptWithIdx => ptWithIdx.contourIdx);
    };

    const getHullDefectVertices = function(handContour, hullIndices) {
        const defects = handContour.convexityDefects(hullIndices);
        const handContourPoints = handContour.getPoints();

      // get neighbor defect points of each hull point
        const hullPointDefectNeighbors = new Map(hullIndices.map(idx => [idx, []]));
        defects.forEach((defect) => {
            const startPointIdx = defect.at(0);
            const endPointIdx = defect.at(1);
            const defectPointIdx = defect.at(2);
            hullPointDefectNeighbors.get(startPointIdx).push(defectPointIdx);
            hullPointDefectNeighbors.get(endPointIdx).push(defectPointIdx);
        });

        return Array.from(hullPointDefectNeighbors.keys())
        // only consider hull points that have 2 neighbor defects
        .filter(hullIndex => hullPointDefectNeighbors.get(hullIndex).length > 1)
        // return vertex points
        .map((hullIndex) => {
            const defectNeighborsIdx = hullPointDefectNeighbors.get(hullIndex);
            return ({
                pt: handContourPoints[hullIndex],
                d1: handContourPoints[defectNeighborsIdx[0]],
                d2: handContourPoints[defectNeighborsIdx[1]]
            });
        });
    };

    const filterVerticesByAngle = function(vertices, maxAngleDeg){
        vertices.filter(function(v) {
            const sq = x => x * x;
            const a = v.d1.sub(v.d2).norm();
            const b = v.pt.sub(v.d1).norm();
            const c = v.pt.sub(v.d2).norm();
            const angleDeg = Math.acos(((sq(b) + sq(c)) - sq(a)) / (2 * b * c)) * (180 / Math.PI);
            return angleDeg < maxAngleDeg;
        });
        return vertices;
    }

            // returns distance of two points
    const ptDist = function(pt1, pt2){
        return pt1.sub(pt2).norm();
    }
    // returns center of all points
    const getCenterPt = pts =>
    pts.reduce((sum, pt) => sum.add(pt), new cv.Point(0, 0)).div(pts.length);
    const blue = new cv.Vec(255, 0, 0);
    const green = new cv.Vec(0, 255, 0);
    const red = new cv.Vec(0, 0, 255);

    const pointColor = new cv.Vec(255, 255, 255);

    objectsInSceneHandler.gestureInterval = setInterval(function(){
        wCap.readAsync(function(err, frame){
            if(frame.empty){
                wCap.reset();
            }
            frame = wCap.read();
                        // const { grabFrames } = require('./utils'); <-- investigate this function

            // main
            const resizedImg = frame.resizeToMax(640);

            const handMask = makeHandMask(resizedImg);
            const handContour = getHandContour(handMask);
            if (!handContour) {
                return;
            }

            const maxPointDist = 25;
            const hullIndices = getRoughHull(handContour, maxPointDist);

              // get defect points of hull to contour and return vertices
              // of each hull point to its defect points
            const vertices = getHullDefectVertices(handContour, hullIndices);

              // fingertip points are those which have a sharp angle to its defect points

            const maxAngleDeg = 60;

            const verticesWithValidAngle = filterVerticesByAngle(vertices, maxAngleDeg);

            //var drawThatCircle = false;
            //var vertext;


            const result = resizedImg.copy();
            const ballScene = resizedImg.copy();
              // draw bounding box and center line

            resizedImg.drawContours([handContour], pointColor, { thickness: 2 }); //previous version: blue


          //  if(verticesWithValidAngle[0].d1!='undefined'){
            try{
                const xValue = verticesWithValidAngle[0].d1.x;
                const vertext = verticesWithValidAngle[0].d1;
                //console.log(xValue);
                ballScene.drawCircle(vertext, 20, pointColor, -5);       // previous version: 50, blueblue

                if(objectsInSceneHandler.saveLastVertex){
                    objectsInSceneHandler.points.push(vertext);
                    objectsInSceneHandler.saveLastVertex = false;

                    socket.emit('getCurrentObjectType', {index: objectsInSceneHandler.points.length});

                    console.log('object position recorded.')
                    console.log(`there are currently ${objectsInSceneHandler.points.length} custom objects in this scene.`);
                }
            }catch(err){
                console.log(err);
            }

          //  }
              // draw points and vertices
            verticesWithValidAngle.forEach(function(v){

                // previous version: the section below was not commented out

            /*    resizedImg.drawLine( v.pt, v.d1, { color: green, thickness: 2 });
                resizedImg.drawLine(v.pt, v.d2, { color: green, thickness: 2 });*/
                resizedImg.drawEllipse(
                    new cv.RotatedRect(v.pt, new cv.Size(10, 10), 0), // previous version: cv.Size(20, 20, 0)

                    { color: red, thickness: 2 }
                );

                result.drawEllipse(
                    new cv.RotatedRect(v.pt, new cv.Size(10, 10), 0), // previous version: cv.Size(20, 20, 0)
                    { color: red, thickness: 2 }
                );
            });

            for(var i=0; i<objectsInSceneHandler.points.length; i++){
                resizedImg.drawCircle(objectsInSceneHandler.points[i], 25, green, -5);
                ballScene.drawCircle(objectsInSceneHandler.points[i], 25, red, -5);
            }
              // display detection result
            const numFingersUp = verticesWithValidAngle.length-2;

            result.drawRectangle(
                new cv.Point(10, 10),
                new cv.Point(70, 70),
                { color: green, thickness: 2 }
            );

            const fontScale = 2;

            result.putText(
                String(numFingersUp),
                new cv.Point(20, 60),
                cv.FONT_ITALIC,
                fontScale,
                { color: green, thickness: 2 }
            );


            const { rows, cols } = result;

            if(objectTarget==0){
                const sideBySide = new cv.Mat(rows, cols * 2, cv.CV_8UC3);
                ballScene.copyTo(sideBySide.getRegion(new cv.Rect(0, 0, cols, rows)));//result
                resizedImg.copyTo(sideBySide.getRegion(new cv.Rect(cols, 0, cols, rows)));


                //cv.imshow('handMask', handMask);
                cv.imshow('result', sideBySide); //sideBySide= a combination of result and resizedImg  result = circled finger tips only; resizedImg = vertex covered hand (green and blue lines, red circles)

                cv.waitKey(9);
            }
            else if(objectTarget==1){
                if(objectsInSceneHandler.adding){
                    const matRGBA = ballScene.channels === 1
                      ? ballScene.cvtColor(cv.COLOR_GRAY2RGBA)
                      : ballScene.cvtColor(cv.COLOR_BGR2RGBA);

                    var bufArray = matRGBA.getData();

                    socket.emit('paintCanvas', {buf: bufArray, rows: ballScene.rows, cols: ballScene.cols, type: 'hand'});
                }
                else{
                    /* Hand mesh*/
                    const matRGBA = resizedImg.channels === 1
                      ? resizedImg.cvtColor(cv.COLOR_GRAY2RGBA)
                      : resizedImg.cvtColor(cv.COLOR_BGR2RGBA);

                    var bufArray = matRGBA.getData();

                   // console.log(bufArray);

                    socket.emit('paintCanvas', {buf: bufArray, rows: resizedImg.rows, cols: resizedImg.cols, type: 'hand'});/**/
                }
            }
        });
    }, delayInterval);
}

function facialRecognitionTest(source, target, renderRate){

    var delayInterval = renderRate;
    var socket = source;
    var outputTarget = target;

    const cv = require('opencv4nodejs');

    const devicePort = 0;
    const wCap = new cv.VideoCapture(devicePort);

    socket.emit('captureResponse', {
        status: 0,
        health: 'good'
    });

    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    //var interval = setInterval(function(){
        //frame = wCap.read();
    objectsInSceneHandler.starter = setInterval(function(){
        wCap.readAsync(function(err, frame){
            if(frame.empty){
                wCap.reset();
            }
            frame = wCap.read();
            //cv.imshow('frame', res);
            //cv.imwrite('./media/capture/cap1.png', frame);
            const resizeFrame = frame.resizeToMax(640);
            const grayImg = resizeFrame.bgrToGray();

            classifier.detectMultiScaleAsync(grayImg, function(err, res){
                if (err) { return console.error(err); }

                const { objects, numDetections } = res;
              //  console.log(objects);
            //  console.log(numDetections);

                if (!objects.length) {
                    console.log('no face detected');

                    return;
                }

                  // draw detection
                const facesImg = resizeFrame.copy();
                const numDetectionsTh = 10;
                objects.forEach(function(rect, i){
                    const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
                    const drawRect = facesImg.drawRectangle(rect, cv.Vec(255, 0, 0), 2, cv.LINE_8);
                    //drawBlueRect(facesImg, rect, { thickness });
                });

                if(outputTarget==0){
                   cv.imshow('frame', facesImg);
                }
                else if(outputTarget==1){
                    // convert your image to rgba color space
                    const matRGBA = facesImg.channels === 1
                      ? facesImg.cvtColor(cv.COLOR_GRAY2RGBA)
                      : facesImg.cvtColor(cv.COLOR_BGR2RGBA);

                    var bufArray = matRGBA.getData();

                   // console.log(bufArray);

                    socket.emit('paintCanvas', {buf: bufArray, rows: facesImg.rows, cols: facesImg.cols, type: 'face'});
                }
                else{
                    console.log('no specified output target for processing results');
                }
            });

            cv.waitKey(10);

        });
    }, delayInterval);
}
