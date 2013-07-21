$(document).ready(function(){

	// Create the map and tiles
	var map = $('#map');

	function createMap(num) {
		for (var i = 0; i < num; i++) {
			var tile = $('<div class="tile">');

			if (i == num - 1) { tile.attr('id', 'last'); }
			// NOTE: 15 is hard-coded in: this should probably be based on the number of tiles somehow...
			// also should adjust CSS accordingly
			tile.attr('data-left', i % 15 + 1);
			tile.attr('data-top', Math.floor(i / 15) + 1);

			map.append(tile);
		}
	}
	createMap(225);
	
	// Create the marker, position it, add data attributes for location, and add it to the map
	var marker = $('<div class="marker">');

	marker.css({
		left: 5,
		top: 5
	})
	marker.attr('data-left', 1);
	marker.attr('data-top', 1);

	map.append(marker);


	var keys = { 
		37: { 
			dir: 'left',
			amt: -1 }, 
		38: { 
			dir: 'top',
			amt: -1 }, 
		39: { 
			dir: 'left',
			amt: 1 }, 
		40: { 
			dir: 'top',
			amt: 1 } 
	};

	var isMoving = false;
	function move(key) {
		isMoving = true;

		bound = key.amt === -1 ? 1 : 15;
		if ( 1===1/* statement to make sure we're within boundaries */ ) {
			marker.css(key.dir, parseInt(marker.css(key.dir)) + 20 * key.amt);
		}

		marker.attr('data-' + key.axis, parseInt(marker.attr('data-' + key.axis)) + key.amt);
		setTimeout(function(){ isMoving = false; }, 200);
	}
	
	$(window).keydown(function(e){
		if (keys.hasOwnProperty(e.keyCode)) { 
			e.preventDefault(); 
			
			if (!isMoving) { move(keys[e.keyCode]); }
		}
	});

});