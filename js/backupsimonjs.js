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


	//When click start increment count + add color to random array

		start.on("click", function (event) {
			boxes.addClass('highlight');
			game();
			boxes.on("click", function (event) {
				$(this).addClass('opac').delay(200).removeClass('opac');

				clicked.push($(this).attr('id'));
				var check = compareArrays(clicked, sequence);
				if (clicked.length === sequence.length && check) {
					if (clicked.length === 10) {
						console.log('Winner!!!');
						count = 0;
						clicked = [];
						boxes.off();
					}
					$(".progress-bar").animate({
   						width: prog[count]
					}).text(prog[count]);
					clicked = [];
					setTimeout(function () {
						game();
					},1500);
				}
				else if (!check) {
					//counter.text("error error");
					console.log(sequence);
					(function () { setTimeout(function() {
						colorDisplay();
						sequence = [];
						}, 1500);
					}) ();
					count = 0;
					$(".progress-bar").animate({
   						width: "0%"
					}).text(prog[count]);
					clicked = [];
					boxes.off();
					$("#startbtn").text("Try again");
				}
	 		});
		});
	



	//add color of clicked box to array
	function game () {
		addSequence();
		count++;
		//counter.text(count);
		colorDisplay();
	}

	function compareArrays(arr1, arr2) {
    	var a =  !arr1.some(function (element, index) {
        	return element != arr2[index];
    	});
    	console.log(a);
    	return a;
	}

	//add class for 2 seconds - remove class -- add next class...
	function colorDisplay () {
		sequence.forEach(function(item, index) {
			(function(i) {
				setTimeout(function() {
					$('#' + item).addClass('opac');
				}, i * 500);
			})(index);
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


