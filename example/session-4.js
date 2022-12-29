import * as THREE from './three.js-master/build/three.module.js'


var scene, camera, renderer

const init = () => {
     scene = new THREE.Scene()

     var fov = 45;
     const aspect = window.innerWidth/window.innerHeight;
     camera = new THREE.PerspectiveCamera(fov, aspect)
     camera.position.z = 1
     camera.position.x = 0.2
     camera.position.y = 0.1
     // camera.position.set(1, 0.1, 0.2)
     renderer = new THREE.WebGLRenderer()
     renderer.setClearColor("rgb(122,122,122)")
     renderer.setSize(window.innerWidth, window.innerHeight)
     document.body.append(renderer.domElement)
}

const render = () => {
     renderer.render(scene,camera)
}

const material = new THREE.MeshNormalMaterial()

const createBox = () => {
     const boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
     
     const boxMesh = new THREE.Mesh(boxGeometry, material)

     scene.add(boxMesh)
}

const createCone = () => {
     const coneGeometry = new THREE.ConeGeometry(0.1, 0.3, 20)
     const coneMesh = new THREE.Mesh(coneGeometry, material)
     
     coneMesh.position.x = 0.3
     scene.add(coneMesh)
}

const createSphere = () => {
     const sphereGeometry = new THREE.SphereGeometry(0.2)
     const sphereMesh = new THREE.Mesh(sphereGeometry, material)
     sphereMesh.position.x = -0.3

     scene.add(sphereMesh)
}

const createCylinder = () => {
     const cylinderGeometry = new THREE.CylinderGeometry(0.1 , 0.1, 0.3, 20)
     const cylinderMesh = new THREE.Mesh(cylinderGeometry, material)
     cylinderMesh.position.x = 0.6

     scene.add(cylinderMesh)


}

const createWireframe = () => {
     const geometry = new THREE.SphereGeometry(0.2)
     const wireframeGeometry = new THREE.WireframeGeometry(geometry)
     const line = new THREE.LineSegments(wireframeGeometry)

     line.position.y = 0.3

     scene.add(line)
}
 
window.onload = () => {
     init()
     createBox()
     createCone()
     createSphere()
     createCylinder()
     createWireframe()
     render()
}