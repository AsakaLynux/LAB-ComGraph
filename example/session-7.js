// import * as THREE from "./three.js/build/three.module.js"
import * as THREE from "three"

// Versi Three js terbaru
// import {FontLoader} from "./three.js/examples/jsm/loaders/FontLoaders.js"
// import {TextGeometry} from "./three.js/examples/jsm/geometries/TextGeomtery.js"

var scene, camera, renderer, width, height;

const init = () => {
    scene = new THREE.Scene()
    width = window.innerWidth;
    height = window.innerHeight

    const fov = 45
    const near = 0.1
    const far = 1000
    const aspect = width/height

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(90, 0, 300)
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor("#87CEEB")
    renderer.setSize(width, height)
    document.body.append(renderer.domElement)
}


const createText = () => {
    // print(window.innerHeight);
    // print(window.innerWidth);
    // Versi Three js lama
    // TypeFace = font yang ada di three js
    const fontLoader = new THREE.FontLoader();
    fontLoader.load("./three.js/examples/fonts/helvetiker_bold.typeface.json", font => {
        const textGeometry = new THREE.TextGeometry("Hello Three.js", {
            font: font,
            size: 20,
            height: 2,
            
        });
    
        const material = new THREE.MeshBasicMaterial({
            color: "blue",
        });
    
        const mesh = new THREE.Mesh(textGeometry, material);
        scene.add(mesh);
    });
    
    // versi Three js baru
    // const textGeometry = new TextGeometry();
}

const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}


window.onload = () => {
    init()
    createText(),
    render()
}
