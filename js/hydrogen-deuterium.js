var lights, proton, neutron, electron, electronTrack, render;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000000);
var controls = new THREE.TrackballControls(camera);
var renderer = new THREE.WebGLRenderer();
var electronsGroup = new THREE.Group();
var atomicNucleus = new THREE.Group();

function deg2rad(_degrees) {
    return (_degrees * Math.PI / 180);
}

renderer.setClearColor(0xffffff, 0); // background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hydrogen').appendChild(renderer.domElement);

// lights
lights = {
    light: new THREE.AmbientLight(0x4cAfff),
    directionalLight: new THREE.PointLight(0x444444, 1)
};

lights.directionalLight.position.set(0, 0, 0);

// proton
proton = new THREE.Mesh(
    new THREE.DodecahedronGeometry(17, 2),
    new THREE.MeshLambertMaterial({
        color: 0xf5f5f5,
        shading: THREE.SmoothShading
    })
);

proton.position.x = -9.5;
proton.position.y = -9.5;
proton.position.z = -9.5;

// neutron
neutron = new THREE.Mesh(
    new THREE.DodecahedronGeometry(17, 1),
    new THREE.MeshLambertMaterial({
        color: 0xf5f5f5,
        shading: THREE.SmoothShading
    })
);

neutron.position.x = 9.5;
neutron.position.y = 9.5;
neutron.position.z = 9.5;

//add partials to nucleus
atomicNucleus.add(proton);
atomicNucleus.add(neutron);

// electrons
electron = new THREE.Mesh(
    new THREE.DodecahedronGeometry(10, 2),
    new THREE.MeshLambertMaterial({
        color: 0xf0f0f0,
        shading: THREE.SmoothShading
    })
);

electron.position.x = 11 * 10 * 5;
electronsGroup.add(electron);

// electron track
electronTrack = new THREE.Mesh(
    new THREE.TorusGeometry(11 * 10 * 5, 2, 3, 100),
    new THREE.MeshBasicMaterial({
        color: 0xf5f5f5,
        shading: THREE.SmoothShading
    })
);

electronsGroup.add(electronTrack);
electronsGroup.rotation.x = deg2rad(90);
electronsGroup.rotation.y = 0;
electronsGroup.rotation.y -= deg2rad(45 / 2);

camera.position.z = -1000;
controls.target = proton.position;

scene.add(atomicNucleus);
scene.add(electronsGroup);
scene.add(lights.light);
scene.add(lights.directionalLight);

render = function () {

    atomicNucleus.rotation.x += 0.5;
    atomicNucleus.rotation.y += 0.5;
    atomicNucleus.rotation.z += 0.5;

    lights.directionalLight.position.x = 100;
    lights.directionalLight.position.y = 100;
    lights.directionalLight.position.z = 100;

    electronsGroup.rotation.z += 0.15;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

render();