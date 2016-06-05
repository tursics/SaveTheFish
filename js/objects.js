/*jslint browser: true*/
/*global $,THREE,PLANE_LENGTH,PLANE_WIDTH,PADDING,getRandomInteger */

function HeroObject() {
	'use strict';
	var hero = {},
		heroGeometry = {},
		heroMaterial = {};

	heroGeometry = new THREE.CylinderGeometry(0, 2, 5, 10);
	heroMaterial = new THREE.MeshLambertMaterial({
		color: 0xE91E63,
		shading: THREE.FlatShading
	});
	hero = new THREE.Mesh(heroGeometry, heroMaterial);
	hero.castShadow = true;
	hero.position.set(0, 5, (PLANE_LENGTH / 2));
	hero.rotation.x = 0.785;

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 37 && hero.position.x !== -(PLANE_WIDTH - PADDING) / 2) {
			hero.position.x -= (PLANE_WIDTH - PADDING) / 2;
		} else if (event.keyCode === 39 && hero.position.x !== (PLANE_WIDTH - PADDING) / 2) {
			hero.position.x += (PLANE_WIDTH - PADDING) / 2;
		}

	});




	return hero;
}

function PlasticObject() {
	'use strict';
	var object = {},
		objectDimension = 0,
		objectGeometry = {},
		objectMaterial = {},
		xPosition = 0,
		xPositionValues = [],
		yPosition = 0,
		yPositionValues = [],
		zPosition = 0,
		zPositionValues = [];

	objectDimension = 2;

	xPositionValues = [ -(PLANE_WIDTH - PADDING) / 2, 0, (PLANE_WIDTH - PADDING) / 2];
	yPositionValues = [ objectDimension + 1 ];
	zPositionValues = [ -(PLANE_LENGTH - PADDING) / 2];

	xPosition = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
	yPosition = yPositionValues[getRandomInteger(0, yPositionValues.length - 1)];
	zPosition = zPositionValues[getRandomInteger(0, zPositionValues.length - 1)];

	objectGeometry = new THREE.BoxGeometry(objectDimension, objectDimension, objectDimension, objectDimension);
	objectMaterial = new THREE.MeshLambertMaterial({
		color: 0x29B6F6,
		shading: THREE.FlatShading
	});
	object = new THREE.Mesh(objectGeometry, objectMaterial);
	object.position.set(xPosition, yPosition, zPosition);
	object.castShadow = true;
	object.receiveShadow = true;
	object.isFish = false;
	object.touched = false;

	object.animate = function () {
		if (object.touched) {
			object.touched = false;
			object.position.x = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
			object.position.z = -PLANE_LENGTH / 2;
		} else if (object.position.z < PLANE_LENGTH / 2 + PLANE_LENGTH / 10) {
			object.position.z += 10;
		} else {
			object.position.x = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
			object.position.z = -PLANE_LENGTH / 2;
		}
	};

	return object;
}

function FishObject() {
	'use strict';
	var object = {},
		objectDimension = 0,
		objectGeometry = {},
		objectMaterial = {},
		xPosition = 0,
		xPositionValues = [],
		yPosition = 0,
		yPositionValues = [],
		zPosition = 0,
		zPositionValues = [];

	objectDimension = 2;

	xPositionValues = [ -(PLANE_WIDTH - PADDING) / 2, 0, (PLANE_WIDTH - PADDING) / 2];
	yPositionValues = [ objectDimension + 1 ];
	zPositionValues = [ -(PLANE_LENGTH - PADDING) / 2];

	xPosition = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
	yPosition = yPositionValues[getRandomInteger(0, yPositionValues.length - 1)];
	zPosition = zPositionValues[getRandomInteger(0, zPositionValues.length - 1)];

	objectGeometry = new THREE.BoxGeometry(objectDimension, objectDimension, objectDimension, objectDimension);
	objectMaterial = new THREE.MeshLambertMaterial({
		color: 0xF629B6,
		shading: THREE.FlatShading
	});
	object = new THREE.Mesh(objectGeometry, objectMaterial);
	object.position.set(xPosition, yPosition, zPosition);
	object.castShadow = true;
	object.receiveShadow = true;
	object.isFish = true;
	object.touched = false;

	object.animate = function () {
		if (object.touched) {
			object.touched = false;
			object.position.x = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
			object.position.z = -PLANE_LENGTH / 2;
		} else if (object.position.z < PLANE_LENGTH / 2 + PLANE_LENGTH / 10) {
			object.position.z += 10;
		} else {
			object.position.x = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
			object.position.z = -PLANE_LENGTH / 2;
		}
	};

	return object;
}


function handleOrientation(event) {
	if(startOrientationPoint=='x') {
		// not detection
	} else if(startOrientationPoint=='') {
		startOrientationPoint = Math.round(event.alpha);
	} else {
			var alpha    = Math.round(event.alpha);
			if(startOrientationPoint<180) {
				var distance = (alpha-startOrientationPoint);
				var position = 'middle';
				var d = 20
				if(distance<(360-d) && distance>180) position = 'right';
				else if(distance>d && distance<180) position = 'left';
			}  else {
				var distance = (alpha-startOrientationPoint);
				var position = 'middle';
				var d = 20
				if(distance<-d && distance<-180) position = 'left';
				else if(distance<-(d) && distance>-180) position = 'right';
			}

			if(position=='middle') hero.position.x = 0;
			else if(position=='left') hero.position.x = -15;
			else if(position=='right') hero.position.x = 15;
			//return position;

	}
}
var startOrientationPoint  = '';
function startOrientation () {
	if(startOrientationPoint == ''){
		window.addEventListener("deviceorientation", handleOrientation, true);
	}
	startOrientationPoint  = '';

}
