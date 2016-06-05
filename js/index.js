/*jslint browser: true*/
/*global $,THREE,HeroObject,PlasticObject,FishObject,updateGameDisplay,showStartGame,showGameOver,createLandscapeFloors,createMountain,createSpotlights */

var PLANE_WIDTH = 50,
	PLANE_LENGTH = 1000,
	PADDING = PLANE_WIDTH / 5 * 2,
	POWERUP_COUNT = 10,
	FISH_COUNT = 10,
	PLASTIC_COUNT = 0,
	PLANE_INDESTRUCTIBLE = false,
	SHOW_STEREO_EFFEKT = false;

var axishelper = {},
    camera = {},
	$container = {},
    controls = {},
    containerWidth = 0,
    containerHeight = 0,
    directionalLight = {},
	effect = {},
    globalRenderID = {},
    hero = {},
    hemisphereLight = {},
    mountain = {},
    mountains = [],
    plane = {},
    planeGeometry = {},
    planeMaterial = {},
    powerup = {},
	powerups = [],
    powerupSpawnIntervalID = {},
    powerupCounterIntervalID = {},
    queue = {},
    renderer = {},
    scene = {},
    sky = {},
    skyGeometry = {},
    skyMaterial = {},
    skyTexture = {};

function getRandomInteger(min, max) {
	'use strict';
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function detectCollisions(objects) {
	'use strict';
	var origin = hero.position.clone(),
		v = 0,
		vMax = 0,
		localVertex,
		globalVertex,
		directionVector,
		ray,
		intersections;

	for (v = 0, vMax = hero.geometry.vertices.length; v < vMax; v += 1) {
		localVertex = hero.geometry.vertices[v].clone();
		globalVertex = localVertex.applyMatrix4(hero.matrix);
		directionVector = globalVertex.sub(hero.position);

		ray = new THREE.Raycaster(origin, directionVector.clone().normalize());
		intersections = ray.intersectObjects(objects);
		if (intersections.length > 0 && intersections[0].distance < directionVector.length()) {
			if (!intersections[0].object.touched) {
				intersections[0].object.touched = true;
				if (intersections[0].object.isFish) {
					--FISH_COUNT;
				} else {
					++PLASTIC_COUNT;
				}
				if (FISH_COUNT === 0) {
					return true;
				}
				updateGameDisplay();
			}
		}
	}
	return false;
}

function startPowerupLogic() {
	'use strict';
	powerupSpawnIntervalID = window.setInterval(function () {
		if (powerups.length < POWERUP_COUNT) {
			var kind = getRandomInteger(0, 2);
			if (0 === kind) {
				powerup = new FishObject();
			} else {
				powerup = new PlasticObject();
			}
			powerups.push(powerup);
			scene.add(powerup);
		}

	}, 4000);

	powerupCounterIntervalID = window.setInterval(function () {
		POWERUP_COUNT += 1;
	}, 30000);
}

function render() {
	'use strict';
	globalRenderID = window.requestAnimationFrame(render);
	controls.update();

	powerups.forEach(function (element, index) {
		powerups[index].animate();
	});

	mountains.forEach(function (element, index) {
		mountains[index].animate();
	});

	if ((PLANE_INDESTRUCTIBLE === false) && (detectCollisions(powerups) === true)) {
		gameOver();
	}

	if (SHOW_STEREO_EFFEKT) {
		effect.render(scene, camera);
	} else {
		renderer.render(scene, camera);
	}
}

function gameOver() {
	'use strict';

	window.cancelAnimationFrame(globalRenderID);
	window.clearInterval(powerupSpawnIntervalID);
	window.clearInterval(powerupCounterIntervalID);

	showGameOver();
}

function restartGame() {
	'use strict';

	POWERUP_COUNT = 10;
	FISH_COUNT = 10;
	PLASTIC_COUNT = 0;
	powerups.forEach(function (element, index) {
		scene.remove(powerups[index]);
	});
	powerups = [];
	hero.position.x = 0;
	render();
	startPowerupLogic();
}

function onWindowResize() {
	'use strict';
	containerWidth = $container.innerWidth();
	containerHeight = $container.innerHeight();
	camera.aspect = containerWidth / containerHeight;
	camera.updateProjectionMatrix();
	renderer.clear();
	renderer.setSize(containerWidth, containerHeight);
}

function initGame(useStereoEffects) {
	'use strict';
	var i = 0,
		isEast = false;

	SHOW_STEREO_EFFEKT = useStereoEffects;
	THREE.ImageUtils.crossOrigin = '';

	$container = $('#container');
	containerWidth = $container.innerWidth();
	containerHeight = $container.innerHeight();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(containerWidth, containerHeight);
	renderer.antialias = true;
	renderer.setClearColor(0xFFFFFF, 1);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	$container.get(0).appendChild(renderer.domElement);

	if (SHOW_STEREO_EFFEKT) {
		effect = new THREE.StereoEffect(renderer);
	}

	scene = new THREE.Scene();

	axishelper = new THREE.AxisHelper(PLANE_LENGTH / 2);

	/* CAMERA */
	camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 1, 3000);
	camera.position.set(0, PLANE_LENGTH / 125, PLANE_LENGTH / 2 + PLANE_LENGTH / 25);

	/* CONTROLS */
	controls = new THREE.OrbitControls(camera, $container.get(0));
	controls.noKeys = true;
	controls.noPan = true;
	controls.noZoom = true;
	controls.minPolarAngle = 1.55;
	controls.maxPolarAngle = 1.55;
	controls.minAzimuthAngle = 0;
	controls.maxAzimuthAngle = 0;

	/* FLOOR */
	planeGeometry = new THREE.BoxGeometry(PLANE_WIDTH, PLANE_LENGTH + PLANE_LENGTH / 10, 1);
	planeMaterial = new THREE.MeshLambertMaterial({
		color: 0x78909C
	});
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = 1.570;
	plane.receiveShadow = true;

	/* LANDSCAPE */
	createLandscapeFloors();
	for (i = 0; i < 60; i += 1) {
		isEast = false;
		if (i > 29) {
			isEast = true;
		}
		createMountain(i, isEast);
	}

	skyGeometry = new THREE.BoxGeometry(1200, 800, 1, 1);
	skyMaterial = new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('assets/background.jpg'),
		depthWrite: false,
		side: THREE.BackSide
	});
	sky = new THREE.Mesh(skyGeometry, skyMaterial);
	sky.position.y = 300;
	sky.position.z = -PLANE_LENGTH / 2 + PADDING;

	/* LIGHTS */
	createSpotlights();
	directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(0, 1, 0);
	hemisphereLight = new THREE.HemisphereLight(0xFFB74D, 0x37474F, 1);
	hemisphereLight.position.y = 500;

	/* POWERUPS */
	startPowerupLogic();

	/* HERO */
	hero = new HeroObject();

	/* SCENE */
	scene.add(camera, directionalLight, hemisphereLight, plane, sky, hero);
}

function runGame() {
	'use strict';
	window.addEventListener('resize', onWindowResize);
	render();
	onWindowResize();
}

showStartGame();
