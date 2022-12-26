// 1. Import three js ke project
import * as THREE from './three.js-master/build/three.module.js'

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

var lighting = () => {
    var pointLight = new THREE.PointLight(0xFFFFFF, 1.5, 100)
    pointLight.position.set(0,0,0)
    pointLight.castShadow = true
    scene.add(pointLight)

    var spotLight = new THREE.SpotLight(0xFFFFFF, 5, 50, Math.PI, 1)
    spotLight.position.set(0,21,10)
    pointLight.castShadow = true
    scene.add(spotLight)
}
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
    scene.add(mesh)
}

var ring = () => {
    var texture = new THREE.TextureLoader().load("assets/texture/saturn/saturnring.jpg")
    var torusGeometry = new THREE.TorusGeometry(4, 0.5, 2.5, 100)
    var torusMaterial = new THREE.MeshLambertMaterial()
    torusMaterial.map = texture
    var mesh = new THREE.Mesh(torusGeometry, torusMaterial)
    mesh.position.set(15, 5, 10)
    mesh.rotation.set(20, 0, 0)
    mesh.castShadow = true
    scene.add(mesh)
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
    scene.add(mesh)
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
    scene.add(BigMeteor)

    var SmallMeteorGeometry = new THREE.DodecahedronGeometry(0.5, 0)
    for (var i = 0; i < 5; i++) {
        var SmallMeteor = new THREE.Mesh(SmallMeteorGeometry, DodecahedronMaterial)
        SmallMeteor.receiveShadow = true
        if ( i % 2 ==0){
            SmallMeteor.position.set(i*2, i*-0.1, i*3)
        }
        else{
            SmallMeteor.position.set(i*-0.5, i*-0.5, i*-4)
        }
        BigMeteor.add(SmallMeteor)
    }
}

var text = () => {
    const loader = new FontLoader();

    loader.load( 'fonts/gentilis_bold.typeface.json', function (font) {

	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5
	} );

    var textMaterial = new THREE.MeshBasicMaterial({
        color: "0xE2C886"
    })

    var txt = new THREE.Mesh(geometry, textMaterial)
    txt.position.set(-1, 18, 0)
    scene.add(txt)
} );


    
}

var object = () => {
    planet()
    ring()
    sun()
    // text()
    Meteor()
}


var render = () => {

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

// Jangan lupa di panggil functionnya :)
lighting()
object()
render()