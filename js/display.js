/*jslint browser: true*/
/*global $,THREE,FISH_COUNT,PLASTIC_COUNT,restartGame,initGame,runGame */

function updateGameDisplay() {
	'use strict';

	console.log('fish: ' + FISH_COUNT + ', plastic: ' + PLASTIC_COUNT);
}

function showStartGame() {
	'use strict';

	$('#overlay-startgame').fadeIn(100);

	$('#btn-start').one('click', function () {
		$('#overlay-startgame').fadeOut(50);

		initGame(false);
		runGame();
	});

	$('#btn-cardboard').one('click', function () {
		$('#overlay-startgame').fadeOut(50);

		initGame(true);
		runGame();
	});
}

function showGameOver() {
	'use strict';

	$('#overlay-gameover').fadeIn(100);

	$('#btn-restart').one('click', function () {
		$('#overlay-gameover').fadeOut(50);

		restartGame();
	});
}