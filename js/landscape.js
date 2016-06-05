/*jslint browser: true*/
/*global $,THREE,PLANE_WIDTH,PLANE_LENGTH,scene,mountains,plane */

function createLandscapeFloors() {
	'use strict';
	var planeLeft = {},
		planeLeftGeometry = {},
		planeLeftMaterial = {},
		planeRight = {};

	planeLeftGeometry = new THREE.BoxGeometry(PLANE_WIDTH, PLANE_LENGTH + PLANE_LENGTH / 10, 1);
	planeLeftMaterial = new THREE.MeshLambertMaterial({
		color: 0x8BC34A
	});
	planeLeft = new THREE.Mesh(planeLeftGeometry, planeLeftMaterial);
	planeLeft.receiveShadow = true;
	planeLeft.rotation.x = 1.570;
	planeLeft.position.x = -PLANE_WIDTH;
	planeLeft.position.y = 1;

	planeRight = planeLeft.clone();
	planeRight.position.x = PLANE_WIDTH;

	scene.add(planeLeft, planeRight);
}

function createMountain(i, isEast) {
	'use strict';
	var loader = {},
		prototype = {},
		object = {},
		objectDimensionX = {},
		objectDimensionY = {},
		objectDimensionZ = {};

	loader = new THREE.ColladaLoader();

	function createObject() {
		object = prototype.clone();
		objectDimensionX = Math.random() * 0.25 + 0.05;
		objectDimensionY = Math.random() * 0.25;
		objectDimensionZ = objectDimensionX;
		object.scale.set(objectDimensionX, objectDimensionY, objectDimensionZ);

		if (isEast === true) {
			object.position.x = PLANE_WIDTH * 2;
			object.position.z = (i * PLANE_LENGTH / 27) - (1.5 * PLANE_LENGTH);
		} else {
			object.position.x = -PLANE_WIDTH * 2;
			object.position.z = (i * PLANE_LENGTH / 27) - (PLANE_LENGTH / 2);
		}

		object.visible = true;

		object.animate = function () {
			if (object.position.z < PLANE_LENGTH / 2 - PLANE_LENGTH / 10) {
				object.position.z += 5;
			} else {
				object.position.z = -PLANE_LENGTH / 2;
			}
		};

		mountains.push(object);
		scene.add(object);
	}

	loader.load(
		'assets/mountain.dae',
		function (collada) {
			prototype = collada.scene;
			prototype.visible = false;
			createObject();
		}
	);
}

function createSpotlights() {
	'use strict';
	var spotLight = {},
		target = {},
		targetGeometry = {},
		targetMaterial = {},
		i = 0;
	for (i = 0; i < 5; i += 1) {
		targetGeometry = new THREE.BoxGeometry(1, 1, 1);
		targetMaterial = new THREE.MeshNormalMaterial();
		target = new THREE.Mesh(targetGeometry, targetMaterial);
		target.position.set(0, 2, (i * PLANE_LENGTH / 5) - (PLANE_LENGTH / 2.5));
		target.visible = false;
		scene.add(target);

		spotLight = new THREE.SpotLight(0x000060, 2);
		spotLight.position.set(150, (i * PLANE_LENGTH / 5) - (PLANE_LENGTH / 2.5), -200);
		spotLight.castShadow = true;
		spotLight.shadowCameraNear = 10;
		spotLight.shadowCameraVisible = false;
		spotLight.target = target;
		spotLight.shadowMapWidth = 2048;
		spotLight.shadowMapHeight = 2048;
		spotLight.fov = 40;

		plane.add(spotLight);
	}
}
