/*jslint browser: true*/
/*global $,THREE */

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
