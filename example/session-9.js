// 1. Import three js ke project
import * as THREE from './Three JS/build/three.module.js'

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

// Atur posisi camera biar object"nya keliatan
camera.position.z = 15 // mundurin sedikit kameranya
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

//  Variable untuk pause dan resume jalannya animasi
var isPaused = true

// buat 3 box dengan jarak 5
var createBox = (x) => {
    var boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    var boxMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    })
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    boxMesh.position.x = x
    boxMesh.position.y = -2
    return boxMesh
}

var createBoxes = (x) => {
    for(let i = 0; i < 3; i++) {
        const box = createBox((i - 1) * 5)
        scene.add(box)
    }
}

createBoxes(5)

// Function untuk mouse move
// Ketika mouse / raycastnya intersect dengan object, maka akan ganti warna
var onMouseMove = (e) => {
 
    // Buat object yang menyimpan koordinat X dan Y
    var mouse = new THREE.Vector2() // X, Y

    // Raycast dari three js -> range -1 sampai 1
    // Normalisasi client X dan client Y

    // Nilai X (Kiri)-1 sampai (kanan)1
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1

    // Nilai Y (Atas)-1 sampai (Bawah)1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    // Cari tau posisi mouse ada diposisi X berapa dan Y berapa
    console.log(`Client X: ${e.clientX}, Client Y: ${e.clientY}`)
    //  N -> Normalized
    console.log(`N Client X: ${mouse.x}, N Client Y: ${mouse.y}`)

    //  Variable Raycaster
    
    var raycaster = new THREE.Raycaster()

    // Raycaster origin (Camera) & raycaster direction (Mouse)
    raycaster.setFromCamera(mouse, camera)

    // Lihat object mana yang intersect dengan raycastnya
    // Array -> semua object yang kena / berpotongan dengan raycast
    var intersected = raycaster.intersectObjects(scene.children)

    console.log(intersected)

    // Validasi array is empty -> agar tidak terjadi variable undefine
    if(intersected.length > 0) {
        //  Ganti warna dari object
        intersected[0].object.material.color.set("#008080")
    }

}

var onMouseClick = (e) => {
 
    var mouse = new THREE.Vector2() 

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1

    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1


    console.log(`Client X: ${e.clientX}, Client Y: ${e.clientY}`)

    console.log(`N Client X: ${mouse.x}, N Client Y: ${mouse.y}`)

   
    var raycaster = new THREE.Raycaster()

    raycaster.setFromCamera(mouse, camera)

    var intersected = raycaster.intersectObjects(scene.children)

    console.log(intersected)

    if(intersected.length > 0) {
        // Pause dan resume animasinya
        if(isPaused) {
            intersected[0].object.material.color.set("yellow")
            isPaused = false
        } else if(!isPaused) {
            intersected[0].object.material.color.set("orange")
            isPaused = true
        }
    }

}

// Add listener ke window
// window.addEventListener('mousemove', onMouseMove)
window.addEventListener('mousedown', onMouseClick)

// Function animation naik keatas
var animate = () => {
    if(!isPaused) {
        // Naikkin ke atas dan kasih sedikit gerakan berputar (Rotasi)
        // Mau ambil object dari yang paling kiri ([0] -> adalah object paling kiri)

        // scene.children[2].position.y -= 0.01
        scene.children[0].position.x -= 1
        // scene.children[2].rotation.x += 2
        // scene.children[2].rotation.y += 2

        // scene.children[1].position.y += 0.01
        // scene.children[1].position.x += 0.01
        // scene.children[1].rotation.x += 2
        // scene.children[1].rotation.y += 2

        // scene.children[2].position.y -= 0.01
        scene.children[2].position.x += 1
        // scene.children[2].rotation.x += 2
        // scene.children[2].rotation.y += 2
    } else if(isPaused) {
        //  Panggil ulang aja renderennya
        renderer.render(scene, camera)
    }

    //Animasi: Callbacknya adalah function itu sendiri
    requestAnimationFrame(animate)
}

// Panggil function anime
animate()

// Selalu taro paling bawah
// 6. buat function untuk renderer
var render = () => {
    // butuh supaya tampilan akan selalu ke update, kalau ga ada nanti gaakan kelihatan pergantian tampilannya
    requestAnimationFrame(render)
    // terima parameter scene dan camera yang akan di render
    renderer.render(scene, camera)
}

// Jangan lupa di panggil functionnya :)
render()