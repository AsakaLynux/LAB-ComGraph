// 1. Import three js ke project
import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'

// 2. Buat scene dari three js
var scene = new THREE.Scene()

// 3. Buat camera
// FOV (Field of View) -> dalam bentuk derajat
const FOV = 45

// Aspect Ratio (mengikuti luas dari layar)
const ASPECT = window.innerWidth / window.innerHeight

// Near (titik terdekat yang dapat terlihat oleh kamera)
const NEAR = 0.1 // harusnya 0.1 itu default

// Far (titik terjauh yang dapat terlihat oleh kamera)
const FAR = 1000

var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
var camera2 = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
// Atur posisi camera biar object"nya keliatan
camera.position.z = 10 // mundurin sedikit kameranya
camera2.position.z = 100
camera.lookAt(0, 0, 0) // tetap difokuskan ke titik 0 (tengah)
camera2.lookAt(0, 0, 0)

// Untuk tampung current camera yang sedang digunakan
var currentCamera = camera

// 4. Render (penggambarannya)
var renderer = new THREE.WebGLRenderer()
// Tentukan ukuran canvas nya
renderer.setSize(window.innerWidth, window.innerHeight)
// Ganti warna dari scene (optional)
renderer.setClearColor("#303030")

// Plane
var createPlane = () => {
    var geometry = new THREE.PlaneGeometry(5, 5)
    var material = new THREE.MeshBasicMaterial({
        color: "#8cdea2",
        side: THREE.DoubleSide
    })
    var mesh = new THREE.Mesh(geometry, material)
    return mesh
}
// Box
var createBox = () => {
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var material = new THREE.MeshBasicMaterial({color: "#ca8cde"})
    var mesh = new THREE.Mesh(geometry, material)
    return mesh
}

var planeMesh = createPlane()
var boxMesh = createBox()
planeMesh.rotation.x = Math.PI/2
boxMesh.position.y = 1
scene.add(planeMesh)
scene.add(boxMesh)

//camera, domElement
var controls = new OrbitControls(camera, renderer.domElement)

// function update dari controls
controls.update()

// Mouse Event
var onMouseMove = (e) => {
    console.log(e)
}

window.addEventListener("mousemove", onMouseMove)

var onMouseClick = (e) => {
    console.log(e.which)
}

window.addEventListener("pointerdown", onMouseClick)


// Keyboar Event -> keyCode -> key apa yang di click
// movement wasd
var movement = (e) => {
    switch (e.keyCode) {
        case 87:
            // W
            boxMesh.position.y += 1;
            break;
        
        case 65:
            // A
            boxMesh.position.x -= 1;
            break;
            
        case 83:
            boxMesh.position.y -= 1;
            // S
            break;

        case 68:
            boxMesh.position.x += 1;
            // D
            break;

        
        default:
            break;
    }
}

window.addEventListener("keydown", movement)

// change camera (zoom in zoom out)
var changeCamera = (e) => {
    if (e.keyCode == 32) {
        if(currentCamera == camera) currentCamera = camera2
        else currentCamera = camera
    }
}
window.addEventListener("keydown", changeCamera)

// 5. Attach ke HTML supaya terlihat hasilnya
// domElement adalah sebuah canvas, renderer di gambar kedalam tag canvas
document.body.appendChild(renderer.domElement)

// Selalu taro paling bawah
// 6. buat function untuk renderer
var render = () => {
    requestAnimationFrame(render)
    controls.update()
    boxMesh.rotation.x += 0.05
    boxMesh.rotation.y += 0.05
    // planeMesh.rotation.x += 0.5
    // planeMesh.rotation.y += 0.5
    // planeMesh.rotation.z += 1
    // terima parameter scene dan camera yang akan di render
    renderer.render(scene, currentCamera)
}

// Jangan lupa di panggil functionnya :)
render()