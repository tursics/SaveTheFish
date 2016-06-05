/*jslint browser: true*/
/*global $,THREE,FISH_COUNT,PLASTIC_COUNT,restartGame,initGame,runGame */

function updateGameDisplay() {
	'use strict';

	console.log('fish: ' + FISH_COUNT + ', plastic: ' + PLASTIC_COUNT);

//gFish.material[].opacity = 0;
// gFish.uniforms['color'].value.setRGB(0.8, 0.8, 0.8);
	// fishShape
}

function showStartGame() {
	'use strict';

	$('#overlay-startgame').fadeIn(100);

	$('#btn-start').one('click', function () {
		$('#overlay-startgame').fadeOut(50);

		initGame(false);
		runGame();
		startOrientation ();
	});

	$('#btn-cardboard').one('click', function () {
		$('#overlay-startgame').fadeOut(50);
		startOrientation ();
		initGame(true);
		runGame();
	});
}

function showGameOver() {
	'use strict';

	$('#gameover-text').text('Super! Du hast das Meer um ' + PLASTIC_COUNT + ' Müllstücke gesäubert');
	$('#overlay-gameover').fadeIn(100);

	$('#btn-restart').one('click', function () {
		$('#overlay-gameover').fadeOut(50);

		restartGame();
	});
}
