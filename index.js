// 1. Import three js ke project
import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
//Tambah fontloader dll
import {FontLoader} from './three.js-master/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from './three.js-master/examples/jsm/geometries/TextGeometry.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

// 2. Buat scene dari three js
var scene = new THREE.Scene()

// 3. Buat camera
// FOV (Field of View) -> dalam bentuk derajat
const FOV = 50

// Aspect Ratio (mengikuti luas dari layar)
const ASPECT = window.innerWidth / window.innerHeight

// Near (titik terdekat yang dapat terlihat oleh kamera)
const NEAR = 0.1 // harusnya 0.1 itu default

// Far (titik terjauh yang dapat terlihat oleh kamera)
const FAR = 1000

var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)

// Atur posisi camera biar object"nya keliatan
camera.position.x = 7
camera.position.y = 17
camera.position.z = 70 // mundurin sedikit kameranya
camera.lookAt(0, 0, 0) // tetap difokuskan ke titik 0 (tengah)

// 4. Render (penggambarannya)
var renderer = new THREE.WebGLRenderer()
// Tentukan ukuran canvas nya
renderer.setSize(window.innerWidth, window.innerHeight)
// Ganti warna dari scene (optional)
renderer.setClearColor("#303030")

// 5. Attach ke HTML supaya terlihat hasilnya
// domElement adalah sebuah canvas, renderer di gambar kedalam tag canvas
document.body.appendChild(renderer.domElement)

var controls = new OrbitControls(camera, renderer.domElement)
controls.update()
// var onMouseMove = (e) => {
//     console.log(e)
// }

// window.addEventListener("mousemove", onMouseMove)

var lighting = () => {
    var pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 100)
    pointLight.position.set(0,0,0)
    pointLight.castShadow = true
    scene.add(pointLight)

}

var light = () => {
    var spotLight = new THREE.SpotLight(0xFFFFFF, 5, 50, Math.PI, 1)
    spotLight.position.set(0,21,10)
    scene.add(spotLight)
}

// var spotlight = () => {
//     var spotLight = new THREE.SpotLight(0xFFFFFF, 5, 50, Math.PI, 1)
//     spotLight.position.set(0,21,10)
//     pointLight.castShadow = true
//     scene.add(spotLight)
// }

var planet = () => {
    var texture = new THREE.TextureLoader().load("assets/texture/saturn/saturn.jpg")
    var sphereGeometry = new THREE.SphereGeometry(2.3, 32, 32)
    var sphereMaterial = new THREE.MeshPhongMaterial()
    sphereMaterial.shininess = 30
    sphereMaterial.bumpMap = texture
    sphereMaterial.map = texture
    var mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.position.set(15, 5, 10)
    mesh.receiveShadow = true
    return mesh
    
}

var ring = () => {
    var texture = new THREE.TextureLoader().load("assets/texture/saturn/saturnring.jpg")
    var torusGeometry = new THREE.TorusGeometry(4, 0.5, 2.5, 100)
    var torusMaterial = new THREE.MeshLambertMaterial()
    torusMaterial.map = texture
    var mesh = new THREE.Mesh(torusGeometry, torusMaterial)
    // mesh.position.set(15, 5, 10)
    mesh.rotation.set(20, 0, 0)
    mesh.castShadow = true
    return mesh
}

var sun = () => {
    var texture = new THREE.TextureLoader().load("assets/texture/sun/sun.jpg")
    var sphereGeometry = new THREE.SphereGeometry(10, 32, 32)
    var sphereMaterial = new THREE.MeshLambertMaterial()
    sphereMaterial.opacity = 0.9
    sphereMaterial.transparent = true
    sphereMaterial.map = texture
    var mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    mesh.position.set(0, 0, 0)
    mesh.receiveShadow = true
    return mesh
}

var Meteor = () => {
    var texture = new THREE.TextureLoader().load("assets/texture/saturn/saturn.jpg")
    var BigMeteorGeometry = new THREE.DodecahedronGeometry(1.5, 0)
    var DodecahedronMaterial = new THREE.MeshPhongMaterial()
    DodecahedronMaterial.map = texture
    DodecahedronMaterial.bumpMap = texture
    DodecahedronMaterial.shininess = 30
    DodecahedronMaterial.transparent= true
    
    var BigMeteor = new THREE.Mesh(BigMeteorGeometry, DodecahedronMaterial)
    BigMeteor.receiveShadow = true
    BigMeteor.position.set(-31, 5, 10)
    

    var SmallMeteorGeometry = new THREE.DodecahedronGeometry(0.5, 0)
    for (var i = 0; i < 4; i++) {
        var SmallMeteor = new THREE.Mesh(SmallMeteorGeometry, DodecahedronMaterial)
        SmallMeteor.receiveShadow = true
        if ( i < 2){
            SmallMeteor.position.set(i*2, 3, 0)
        }
        else{
            SmallMeteor.position.set(i*-1, -3, 0)
        }
        
        BigMeteor.add(SmallMeteor)   
    }
    return BigMeteor
}

// Load 3D
let model;

new GLTFLoader().load('assets/model/scene.gltf', (loadedModel) => {
    model = loadedModel.scene;
    model.position.set(0, 15, 0)
    model.scale.set(1, 1, 1)
    scene.add(model);
});

// Bikin text
var createText = () => {
    const loader = new FontLoader();

    loader.load( './three.js-master/examples/fonts/gentilis_bold.typeface.json', function ( font ) {
    
        const geometry = new TextGeometry( 'UFO', {
            font: font,
            size: 1,
            height: 1
        } )
        const material = new THREE.MeshBasicMaterial({
            color: "0xE2C886"
        })
        const textMesh = new THREE.Mesh(geometry, material)
        textMesh.position.set(-1, 18, 0)
        scene.add(textMesh)
    } )
}

//Movement 3D
var movement = (e) => {
    switch (e.keyCode) {
        case 87:
            //w
            model.position.y += 1
            break;
    
        case 65:
            //a
            model.position.x -= 1
            break;

        case 83:
            //s
            model.position.y -= 1
            break;
    
        case 68:
            //d
            model.position.x += 1
            break;
    }
}

window.addEventListener("keydown", movement)


var object = () => {
    planet()
    ring()
    sun()
    // text()
    Meteor()
}







var Sun = sun()
scene.add(Sun)

var ENPlanet = planet()
Sun.add(ENPlanet)

var ENRing = ring()
ENPlanet.add(ENRing)

var meteor = Meteor()
Sun.add(meteor)

// var text = createText()
// model.add(text)

var render = () => {
    Sun.rotation.y += 0.02
    ENPlanet.rotation.y += 0.01    
    controls.update()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

// Jangan lupa di panggil functionnya :)
lighting()
light()
// spotlight()
object()
createText()
render()