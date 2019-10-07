Leap.loop({background: true}, {
    hand: function (hand) {
        hand.fingers.forEach(function (finger) {
          // This is the meat of the example - Positioning `the cylinders on every frame:
          finger.data('boneMeshes').forEach(function(mesh, i){
              var bone = finger.bones[i];
              mesh.position.fromArray(bone.center());
              mesh.setRotationFromMatrix(
                (new THREE.Matrix4).fromArray( bone.matrix() )
              );
              mesh.quaternion.multiply(baseBoneRotation);
          });

          finger.data('jointMeshes').forEach(function(mesh, i){
              var bone = finger.bones[i];
              if (bone) {
                mesh.position.fromArray(bone.prevJoint);
              }
              else{
              // special case for the finger tip joint sphere:
              bone = finger.bones[i-1];
              mesh.position.fromArray(bone.nextJoint);
            }
          });

        });
  /*      var armMesh = hand.data('armMesh');
        armMesh.position.fromArray(hand.arm.center());
        armMesh.setRotationFromMatrix(
          (new THREE.Matrix4).fromArray( hand.arm.matrix() )
        );
        armMesh.quaternion.multiply(baseBoneRotation);
        armMesh.scale.x = hand.arm.width / 3; //2
        armMesh.scale.z = hand.arm.width / 3; //4*/

        if(hand.palmPosition[0]>100){
            if(sessionManager.lastMove!="right"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove = "right";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("move drone right");
                    console.log(`last move: ${sessionManager.lastMove}`);
                }
            }
        }
        else if(hand.palmPosition[0]<-100){
            if(sessionManager.lastMove!="left"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove = "left";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("move drone left");
                    console.log(`last move: ${sessionManager.lastMove}`);
                }
            }
        }

        if(hand.palmPosition[2]>100){
            if(sessionManager.lastMove!="back"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove = "back";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("move drone back");
                    console.log(`last move: ${sessionManager.lastMove}`);
                }
            }
        }
        else if(hand.palmPosition[2]<15){
            if(sessionManager.lastMove!="forward"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove = "forward";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("move drone forward");
                    console.log(`last move: ${sessionManager.lastMove}`);
                }
            }
        }

        if(hand.palmPosition[1]>150){
            if(sessionManager.lastMove!="up"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove = "up";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("move drone up");
                    console.log(`last move: ${sessionManager.lastMove}`);
                }
            }
        }
        else if(hand.palmPosition[1]<50){
            if(sessionManager.lastMove!="down"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove = "down";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("move drone down");
                    console.log(`last move: ${sessionManager.lastMove}`);
                }
            }
        }

        if(hand.palmPosition[0]<100&&hand.palmPosition[0]>-100&&hand.palmPosition[2]<100&&hand.palmPosition[2]>15&&hand.palmPosition[1]<75&&hand.palmPosition[1]>25){
            if(sessionManager.lastMove!="hover"){
                sessionManager.moveCount = 0;
                sessionManager.lastMove= "hover";
            }
            else {
                sessionManager.moveCount++;
                if(sessionManager.moveCount>=5){
                    console.log("hover x");
                }
            }
        }

        renderer.render(scene, camera);
}})
.use('handHold')
.use('handEntry')
.on('handFound', function(hand){
    hand.fingers.forEach(function (finger) {
        var boneMeshes = [];
        var jointMeshes = [];
        finger.bones.forEach(function(bone) {
            // create joints
            // CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
            var boneMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(5, 5, bone.length),
                new THREE.MeshPhongMaterial()
            );
            boneMesh.material.color.setHex(0xffffff);
            scene.add(boneMesh);
            boneMeshes.push(boneMesh);
        });

        for (var i = 0; i < finger.bones.length + 1; i++) {
            var jointMesh = new THREE.Mesh(
                new THREE.SphereGeometry(8),
                new THREE.MeshPhongMaterial()
            );
            jointMesh.material.color.setHex(0x00ff00);
            scene.add(jointMesh);
            jointMeshes.push(jointMesh);
        }
        finger.data('boneMeshes', boneMeshes);
        finger.data('jointMeshes', jointMeshes);

  });
  /*if (hand.arm){ // 2.0.3+ have arm api,
    // CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    var armMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, hand.arm.length, 64),
      new THREE.MeshPhongMaterial()
    );
    armMesh.material.color.setHex(0xffffff);
    scene.add(armMesh);
    hand.data('armMesh', armMesh);
  }*/
})
.on('handLost', function(hand){
    hand.fingers.forEach(function (finger) {
      var boneMeshes = finger.data('boneMeshes');
      var jointMeshes = finger.data('jointMeshes');
      boneMeshes.forEach(function(mesh){
        scene.remove(mesh);
      });
      jointMeshes.forEach(function(mesh){
        scene.remove(mesh);
      });
      finger.data({
        boneMeshes: null,
        boneMeshes: null
      });
    });
  /*  var armMesh = hand.data('armMesh');
    scene.remove(armMesh);
    hand.data('armMesh', null);*/

    console.log("hover stop");
    renderer.render(scene, camera);
})
.connect();
// all units in mm

var initScene = function () {
        window.scene = new THREE.Scene();
        window.renderer = new THREE.WebGLRenderer({
          alpha: true
        });
        window.renderer.setClearColor(0x000000, 0);
        window.renderer.setSize(window.innerWidth, window.innerHeight);
        window.renderer.domElement.style.position = 'fixed';
        window.renderer.domElement.style.top = "10%";
        window.renderer.domElement.style.left = 0;
        window.renderer.domElement.style.width = '100%';
        window.renderer.domElement.style.height = '90%';
        document.body.appendChild(window.renderer.domElement);
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set( 0, 0.5, 1 );
        window.scene.add(directionalLight);
        window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        window.camera.position.fromArray([0, 100, 500]);
        window.camera.lookAt(new THREE.Vector3(0, 160, 0));
        window.addEventListener('resize', function () {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.render(scene, camera);
        }, false);
        scene.add(camera);
        renderer.render(scene, camera);
};

var colors = [0xff0000, 0x00ff00, 0x0000ff];
var baseBoneRotation = (new THREE.Quaternion).setFromEuler(
        new THREE.Euler(Math.PI / 2, 0, 0)
);

var sessionManager = {
  connection: null,
  drone: {
    position: null,
    currentDirection: null,
    lastMove : "hover",
    moveCount: 0
  }
};
