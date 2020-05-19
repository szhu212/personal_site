let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 4000);
let renderer
let light   
let spheres = []
let raycaster
let mouse = new THREE.Vector2(), INTERSECTED;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var radius = 100, theta = 0;


function init() {
    
    camera.position.set( 0, 0, 2200 );
    camera.lookAt(scene.position);

    //environment reflection
    var path = 'texture/CoitTower2/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    // var path2 = 'texture/snow/';
    // var format = '.jpg';
    // var snowUrls = [
    // path2 + 'px' + format, path2 + 'nx' + format,
    // path2 + 'py' + format, path2 + 'ny' + format,
    // path2 + 'pz' + format, path2 + 'nz' + format
    // ];
    let reflectionCube = new THREE.CubeTextureLoader().load( urls );
    let refractionCube = new THREE.CubeTextureLoader().load( urls )
    // var bg = new THREE.CubeTextureLoader().load( snowUrls );
    refractionCube.mapping = THREE.CubeRefractionMapping;

    const fontLoader = new THREE.FontLoader();
    fontLoader.load('https://threejs.org//examples/fonts/gentilis_regular.typeface.json', function(font) {
       
        // refractionCube.mapping = THREE.CubeRefractionMapping;
        // var material = new THREE.MeshLambertMaterial( { color: 0xffffff ,  refractionRatio: 0.8} )
        // var material = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube, reflectivity: 0.3 } );
        let material = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: refractionCube, refractionRatio: 0.85 } )
        // scene.background = bg;
        let textGeo = new THREE.TextGeometry('Skylar Zhu', {
            font: font,
            size: 90,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            material: 0,
            extrudeMaterial: 1,
            //  bevelThickness: 5
        });
        textGeo.center();
        textGeo.computeBoundingBox();
        let textTitle = new THREE.TextGeometry('Software Engineer', {
            font: font,
            size: 45,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            material: 0,
            extrudeMaterial: 1,
            // bevelThickness: 1
        });
        textTitle.center();
        // textTitle.position.y += 100
        textTitle.computeBoundingBox();

    //textGeo.computeVertexNormals();
        let mesh = new THREE.Mesh(textGeo, material);
        let meshTitle = new THREE.Mesh(textTitle, material);
        meshTitle.position.y -= 130;
        // meshTitle.position.x -= 120;
        scene.add(mesh);
        scene.add(meshTitle);

    })

    // small squares behind name
     let geometry3 = new THREE.BoxBufferGeometry( 25, 30, 40 );

    for ( let i = 0; i < 300; i ++ ) {
        let object
        if (i % 6 == 0){
            object = new THREE.Mesh( geometry3, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff  , envMap: refractionCube, refractionRatio: 0.7 } ) );
        } else {
            object = new THREE.Mesh( geometry3, new THREE.MeshLambertMaterial( { color: 'lightblue'  , envMap: refractionCube, refractionRatio: 0.7 } ) );
        }
        // else {
        //     object = new THREE.Mesh( geometry3, material );

        // }

        object.position.x = Math.random() * 1600 - 800;
        object.position.y = Math.random() * 1000 - 500;
        object.position.z = Math.random() * 390 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        scene.add( object );

    }

    // small objects in front of name

    let farObjGeometry = new THREE.BoxBufferGeometry( 25, 30, 40 );
    let farObj
        for ( let i = 0; i < 100; i ++ ) {
            farObj = new THREE.Mesh( farObjGeometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff  , envMap: refractionCube, refractionRatio: 0.7 } ) );
        
             farObj.position.x = Math.random() * 1600 - 800;
             farObj.position.y = Math.random() * 1400 - 700;
             farObj.position.z = Math.random() * 510 + 600;
    
             farObj.rotation.x = Math.random() * 2 * Math.PI;
             farObj.rotation.y = Math.random() * 2 * Math.PI;
             farObj.rotation.z = Math.random() * 2 * Math.PI;
    
             farObj.scale.x = Math.random() + 0.5;
             farObj.scale.y = Math.random() + 0.5;
             farObj.scale.z = Math.random() + 0.5;
    
            scene.add( farObj );
        }

    // light
    light = new THREE.PointLight(0xff00ff);
    light.position.set(0, 0, 15);

    const ambient1 = new THREE.AmbientLight( 0xffffff );
				scene.add( ambient1 );

    pointLight = new THREE.PointLight( 0xffffff, 1.2 );
    scene.add( pointLight );
   

   let matFloor = new THREE.MeshBasicMaterial({color: 'black'});
   var geoFloor = new THREE.PlaneBufferGeometry( 580, 140 );
   var mshFloor = new THREE.Mesh( geoFloor, matFloor );
   mshFloor.receiveShadow = true;
   mshFloor.position.set( 0, - 0.05, 0 );
   scene.add( mshFloor );


   raycaster = new THREE.Raycaster();
      renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
   window.addEventListener( 'resize', onWindowResize, false );  

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function render() {
    if (camera.position.z > 500){
        camera.position.z -= 25;
    }

    camera.lookAt( scene.position );
    requestAnimationFrame(render);
    raycaster.setFromCamera( mouse, camera );

        let intersects = raycaster.intersectObjects( scene.children );

        if ( intersects.length > 0 ) {

            if ( INTERSECTED != intersects[ 0 ].object ) {

                if ( INTERSECTED && INTERSECTED.material.emissive) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                INTERSECTED = intersects[ 0 ].object;
                if(INTERSECTED.material.emissive){
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(  0xff0000 );

                }
                //red: 0xff0000, yellow:  0xffff00

            }

        } else {

            if ( INTERSECTED && INTERSECTED.material.emissive) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = null;

        }

    renderer.render(scene, camera);
}

init();
render();