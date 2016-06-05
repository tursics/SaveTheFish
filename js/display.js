/*jslint browser: true*/
/*global $,THREE,FISH_COUNT,PLASTIC_COUNT,restartGame */

function updateGameDisplay() {
	'use strict';

	console.log('fish: ' + FISH_COUNT + ', plastic: ' + PLASTIC_COUNT);
}

function showGameOver() {
	'use strict';

	$('#overlay-gameover').fadeIn(100);

	$('#btn-restart').one('click', function () {
		$('#overlay-gameover').fadeOut(50);

		restartGame();
	});
}
