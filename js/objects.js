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
		// console.log('# '+hero.position.x = -15);
	});




	return hero;
}

function PlasticObject() {
	'use strict';
	var object = {},
		objectDimension = 0,
		objectGeometry = {},
		objectMaterial = {},
		objectDimensionX = {},
		objectDimensionY = {},
		objectDimensionZ = {},
		loader = {},
		prototype = {},
		xPosition = 0,
		xPositionValues = [],
		yPosition = 0,
		yPositionValues = [],
		zPosition = 0,
		zPositionValues = [];

	loader = new THREE.OBJLoader();

	function createObject() {
		object = prototype.clone();
		objectDimensionX = 0.05;
		objectDimensionY = objectDimensionX;
		objectDimensionZ = objectDimensionX;
		object.scale.set(objectDimensionX, objectDimensionY, objectDimensionZ);

		xPositionValues = [ -(PLANE_WIDTH - PADDING) / 2, 0, (PLANE_WIDTH - PADDING) / 2];
		yPositionValues = [ objectDimension + 1 ];
		zPositionValues = [ -(PLANE_LENGTH - PADDING) / 2];

		xPosition = xPositionValues[getRandomInteger(0, xPositionValues.length - 1)];
		yPosition = yPositionValues[getRandomInteger(0, yPositionValues.length - 1)];
		zPosition = zPositionValues[getRandomInteger(0, zPositionValues.length - 1)];

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

		object.visible = true;
		powerups.push(object);
		scene.add(object);
	}

	loader.load(
		'assets/coffeecup.obj',
		function (obj) {
			prototype = obj;
			prototype.visible = false;
			createObject();
		}
	);

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
			else if(position=='left') hero.position.x = -8;
			else if(position=='right') hero.position.x = 8;
			// console.log(position);
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

function ShapeObject(shape, color, x, y, z, rx, ry, rz, s) {
	'use strict';
	var o = {},
		oGeometryS = {},
		oMaterialS = {},
		oGeometryL = {},
		oMaterialL = {};
    o = new THREE.Group();

// flat shape
	  oGeometryS = new THREE.ShapeGeometry( shape );
	  oMaterialS = new THREE.MeshBasicMaterial( { color: color, overdraw: 0.5 } );

	  var mesh = new THREE.Mesh( oGeometryS, oMaterialS );
	  mesh.position.set( x, y, z );
	  mesh.rotation.set( rx, ry, rz );
	  mesh.scale.set( s, s, s );
	  o.add( mesh );

// line
	  oGeometryL = shape.createPointsGeometry();
	  oGeometryL.vertices.push( oGeometryL.vertices[ 0 ].clone() );

	  oMaterialL = new THREE.LineBasicMaterial( { linewidth: 10, color: 0x333333, transparent: true } );

	  var line = new THREE.Line( oGeometryL, oMaterialL );
	  line.position.set( x, y, z );
	  line.rotation.set( rx, ry, rz );
	  line.scale.set( s, s, s );
	  o.add( line );


    o.addShapeGroup = function( shape, color, x, y, z, rx, ry, rz, s ) {
	    'use strict';
      var g = new THREE.Group();
	    //group.position.y = 50;
	    // flat shape

	    var geometry = new THREE.ShapeGeometry( shape );
	    var material = new THREE.MeshBasicMaterial( { color: color, overdraw: 0.5 } );

	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.set( x, y, z );
	    mesh.rotation.set( rx, ry, rz );
	    mesh.scale.set( s, s, s );
	    g.add( mesh );

	    // line

	    var geometry = shape.createPointsGeometry();
	    geometry.vertices.push( geometry.vertices[ 0 ].clone() );

	    var material = new THREE.LineBasicMaterial( { linewidth: 10, color: 0x333333, transparent: true } );

	    var line = new THREE.Line( geometry, material );
	    line.position.set( x, y, z );
	    line.rotation.set( rx, ry, rz );
	    line.scale.set( s, s, s );
	    g.add( line );
      return g;
    }
  return o;
}

// Fish

x = y = 0;

var fishShape = new THREE.Shape();
x = -260;
fishShape.moveTo(x,y);
fishShape.quadraticCurveTo(x + 50, y - 80, x + 90, y - 10);
fishShape.quadraticCurveTo(x + 100, y - 10, x + 115, y - 40);
fishShape.quadraticCurveTo(x + 115, y, x + 115, y + 40);
fishShape.quadraticCurveTo(x + 100, y + 10, x + 90, y + 10);
fishShape.quadraticCurveTo(x + 50, y + 80, x, y);




// Smiley

var smileyShape = new THREE.Shape();
smileyShape.moveTo( 80, 40 );
smileyShape.absarc( 40, 40, 40, 0, Math.PI*2, false );

var smileyEye1Path = new THREE.Path();
smileyEye1Path.moveTo( 35, 20 );
// smileyEye1Path.absarc( 25, 20, 10, 0, Math.PI*2, true );
smileyEye1Path.absellipse( 25, 20, 10, 10, 0, Math.PI*2, true );

smileyShape.holes.push( smileyEye1Path );

var smileyEye2Path = new THREE.Path();
smileyEye2Path.moveTo( 65, 20 );
smileyEye2Path.absarc( 55, 20, 10, 0, Math.PI*2, true );
smileyShape.holes.push( smileyEye2Path );

var smileyMouthPath = new THREE.Path();
/*/ugly box mouth
smileyMouthPath.moveTo( 20, 40 );
smileyMouthPath.lineTo( 60, 40 );
smileyMouthPath.lineTo( 60, 60 );
smileyMouthPath.lineTo( 20, 60 );
smileyMouthPath.lineTo( 20, 40 );
*/
smileyMouthPath.moveTo( 20, 40 );
smileyMouthPath.quadraticCurveTo( 40, 60, 60, 40 );
smileyMouthPath.bezierCurveTo( 70, 45, 70, 50, 60, 60 );
smileyMouthPath.quadraticCurveTo( 40, 80, 20, 60 );
smileyMouthPath.quadraticCurveTo( 5, 50, 20, 40 );

smileyShape.holes.push( smileyMouthPath );
