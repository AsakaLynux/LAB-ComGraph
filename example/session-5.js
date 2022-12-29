import * as THREE from "./three.js/build/three.module.js"

var scene, camera, renderer;

	scene = new THREE.Scene()
	const fov = 45;
	const aspect = window.innerWidth/window.innerHeight;
	camera = new THREE.PerspectiveCamera(fov, aspect)
	camera.position.set(0, 0, 5)
	camera.lookAt(0,0,0)
	
	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("rgb(122, 122, 122)")
	document.body.append(renderer.domElement)




const createBox = () => {
	const boxGeometry = new THREE.BoxGeometry(1,1,1)
	const material = new THREE.MeshPhongMaterial({
		color: 0xfcba03,
		shininess: 100,
	
	})
	const boxMesh = new THREE.Mesh(boxGeometry, material)
	const wf = new THREE.WireframeGeometry(boxGeometry)
	const line = new THREE.LineSegments(wf)
	boxMesh.add(line)
	return boxMesh
}

const createLighting = () => {
	// const AmbientLight = new THREE.AmbientLight(0x008080)
	
	
	const pointLight = new THREE.PointLight(0xfffff, 1, 100, 1)
	pointLight.position.set(0, 6, 0)
	pointLight.castShadow = true;
	scene.add(pointLight)
	// const pointLightHelper = new THREE.PointLightHelper(ligth)

	// const spotLight = new THREE.SpotLight( 0xffffff, 2, 10, Math.PI/20);
	// spotLight.position.y = 2
	// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
	// scene.add(spotLightHelper)

	// const directionLight = new THREE.DirectionalLight(0xffffff, 1)
	
	// const directionLightHelper = new THREE.DirectionalLightHelper(directionLight)
	// scene.add(directionLightHelper)
	// scene.add(directionLight)
}

const createPlane = () => {
	const planeGeometry = new THREE.PlaneGeometry(4,4)
	const planeMaterial = new THREE.MeshLambertMaterial({color: 0xfffff})
	const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

	return planeMesh
}

var boxMesh = createBox()
boxMesh.position.y = 0.8
boxMesh.castShadow = true
boxMesh.receiveShadow = true
scene.add(boxMesh)

var planeMesh = createPlane()
planeMesh.rotation.x = Math.PI/-5 
planeMesh.receiveShadow = true
scene.add(planeMesh)


const render = () => {
	boxMesh.rotation.x += 0.02
	boxMesh.rotation.y += 0.02
	requestAnimationFrame(render)
	renderer.shadowMap.enabled = true
	renderer.render(scene, camera)
}


// const createCone = () => {
//     const coneGeometry = new THREE.ConeGeometry(1.5, 1.5, 7)
//     const material = new THREE.MeshDepthMaterial()
//     const coneMesh = new THREE.Mesh(coneGeometry, material)
//     coneMesh.position.set(2, 0, 2)
//     scene.add(coneMesh)
// }

// const createSphere = () => {
//     //Kalo pengen smooth gedein segment
//     const sphereGeometry = new THREE.SphereGeometry(1, 8, 8)
//     const material = new THREE.MeshNormalMaterial()
//     const sphereMesh = new THREE.Mesh(sphereGeometry, material)
//     sphereMesh.position.x=3
//     sphereMesh.rotation.x = 4
//     scene.add(sphereMesh)
// }

// const createCylinder = () => {
//     const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 10)
//     const material = new THREE.MeshNormalMaterial()
//     const cylinderMesh = new THREE.Mesh(cylinderGeometry, material)
//     cylinderMesh.position.x = -5
//     scene.add(cylinderMesh)

// }


// const createWireframe = () => {
//     //Wireframe itu kerangka dari geometry
//     const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
//     const material = new THREE.MeshNormalMaterial()
//     const wireframeGeometry = new THREE.WireframeGeometry(boxGeometry)
    
//     const lineSegments = new THREE.LineSegments(wireframeGeometry, material)
//     lineSegments.position.z = -5
//     scene.add(lineSegments)
// }




window.onload = () => {
    // createCone()
    // createSphere()
    // createCylinder()
    // createWireframe()
    createLighting()
    render()

}

