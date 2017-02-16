$( document ).ready(function() {
	console.log('connected');

	var boxes = $(".colorbox");
	var start = $("#startbtn");
	var counter = $("#count");
	var strict = $("#strict");
	var bar = $(".progress-bar");

	var count = 0;
	var colors = ["blue", "red", "green", "yellow"];
	var sequence = [];
	var clicked = [];
	var prog = ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
	var check;

	var colorSounds = {
			blue: {
				sound: new Howl({
		  		src: ['sounds/bubbles.mp3']
				})
			},
			red: {
				sound: new Howl({
		  		src: ['sounds/clay.mp3']
				})
			},
			green: {
				sound: new Howl({
		  		src: ['sounds/moon.mp3']
				})
			},
			yellow: {
				sound: new Howl({
				src: ['sounds/pinwheel.mp3']	
				})
			}
	}



	//start game
	run();

	function run () {
		start.on("click", function (event) {
				$("h1").text("The Goldfish-Memory Tester");
				disableBtn();
				boxes.addClass('highlight');
				game();
				boxes.on("click", function (event) {
					colorSounds[$(this).attr('id')].sound.play();
					clicked.push($(this).attr('id'));
					check = compareArrays(clicked, sequence);				
					if (clicked.length === sequence.length && check) {
						if (clicked.length === 10) {
							$("h1").text('Such memory, much wow!');
							sequence = [];
							resetGame();
						}
						else {
							continueGame();
						}
					}
					else if (!check) {
						console.log(sequence);
						(function () { setTimeout(function() {
							colorDisplay();
							sequence = [];
							}, 1500);
						}) ();
						resetGame();
					}
		 		});
			});
	}	

	//add color of clicked box to array
	function game () {
		addSequence();
		count++;
		//counter.text(count);
		colorDisplay();
		start.text("Start");
	}

	function continueGame () {
		$(".progress-bar").animate({
   			width: prog[count]
		}).text(prog[count]);
		clicked = [];
		setTimeout(function () {
			game();
		},1500);
	}

	function resetGame () {
		clicked = [];
		boxes.off();
		count = 0;
		$(".progress-bar").animate({
   			width: "0%"
		}).text(prog[count]);
		start.text("Try again");
		run();
	}

	function disableBtn () {
		start.off();
	}

	function compareArrays(arr1, arr2) {
    	var testOrder =  !arr1.some(function (element, index) {
        	return element != arr2[index];
    	});
    	console.log(testOrder);
    	return testOrder;
	}


	function colorDisplay () {
		sequence.forEach(function(item, index) {
			//add opacity after i * 500ms (500)
			(function(i) {
				setTimeout(function() {
					$('#' + item).addClass('opac');
					colorSounds[item].sound.play();
				}, i * 500);
			})(index);
			//remove opacity after i * 600ms (600)
			(function(i) {
				if(i == 0) {
					i = 0.3;
				}
				setTimeout(function() {
					$('#' + item).removeClass('opac');
				}, i * 600);
			})(index);
		});
	}

	//add random color to sequence array
	function addSequence () {
		sequence.push(colors[randNr()]);
		console.log(sequence);
	}
	function randNr () {
		return Math.floor(Math.random()*4);
	}
});

