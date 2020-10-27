var options = [{
		number: "0",
		color: "#0F0",
	},
	{
		number: "32",
		color: "#000",
	},
	{
		number: "15",
		color: "#F00",
	},
	{
		number: "19",
		color: "#000",
	},
	{
		number: "4",
		color: "#F00",
	},
	{
		number: "21",
		color: "#000",
	},
	{
		number: "2",
		color: "#F00",
	},
	{
		number: "25",
		color: "#000",
	},
	{
		number: "17",
		color: "#F00",
	},
	{
		number: "34",
		color: "#000",
	},
	{
		number: "37",
		color: "#F00",
	},
	{
		number: "6",
		color: "#000",
	},
	{
		number: "27",
		color: "#F00",
	},
	{
		number: "13",
		color: "#000",
	},
	{
		number: "36",
		color: "#F00",
	},
	{
		number: "11",
		color: "#000",
	},
	{
		number: "30",
		color: "#F00",
	},
	{
		number: "8",
		color: "#000",
	},
	{
		number: "23",
		color: "#F00",
	},
	{
		number: "10",
		color: "#000",
	},
	{
		number: "5",
		color: "#F00",
	},
	{
		number: "24",
		color: "#000",
	},
	{
		number: "16",
		color: "#F00",
	},
	{
		number: "33",
		color: "#000",
	},
	{
		number: "1",
		color: "#F00",
	},
	{
		number: "20",
		color: "#000",
	},
	{
		number: "14",
		color: "#F00",
	},
	{
		number: "31",
		color: "#000",
	},
	{
		number: "9",
		color: "#F00",
	},
	{
		number: "22",
		color: "#000",
	},
	{
		number: "18",
		color: "#F00",
	},
	{
		number: "29",
		color: "#000",
	},
	{
		number: "7",
		color: "#F00",
	},
	{
		number: "28",
		color: "#000",
	},
	{
		number: "12",
		color: "#F00",
	},
	{
		number: "35",
		color: "#000",
	},
	{
		number: "3",
		color: "#F00",
	},
	{
		number: "26",
		color: "#000",
	},
];

var res = null;

var even = false;
var numbers = [];
var odd = false;
var red = false;
var black = false;
var green = false;

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinAngleStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("startGame").addEventListener("click", spin);

function spin() {
	if (!even && !odd && !red && !black && !green && numbers.length === 0)
		alert("Пожалуйста выберите ставку.");
	else {
		$("#result").html("&nbsp;");
		spinAngleStart = Math.random() * 10 + 10;
		spinTime = 0;
		spinTimeTotal = Math.random() * 3 + 4 * 1000;
		rotateWheel();
	}
}

function drawRouletteWheel() {
	var canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		var outsideRadius = 200;
		var textRadius = 160;
		var insideRadius = 125;

		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 500, 500);

		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;

		ctx.font = "bold 14px Helvetica, Arial";

		for (var i = 0; i < options.length; i++) {
			var angle = startAngle + i * arc;
			ctx.fillStyle = options[i].color;

			ctx.beginPath();
			ctx.arc(300, 250, outsideRadius, angle, angle + arc, false);
			ctx.arc(300, 250, insideRadius, angle + arc, angle, true);
			ctx.stroke();
			ctx.fill();

			ctx.save();
			ctx.shadowOffsetX = -1;
			ctx.shadowOffsetY = -1;
			ctx.shadowBlur = 0;
			ctx.fillStyle = "#fff";
			ctx.translate(
				300 + Math.cos(angle + arc / 2) * textRadius,
				250 + Math.sin(angle + arc / 2) * textRadius
			);
			ctx.rotate(angle + arc / 2 + Math.PI / 2);
			var text = options[i].number;
			ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
			ctx.restore();
		}

		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.moveTo(300 - 4, 250 - (outsideRadius + 5));
		ctx.lineTo(300 + 4, 250 - (outsideRadius + 5));
		ctx.lineTo(300 + 4, 250 - (outsideRadius - 5));
		ctx.lineTo(300 + 9, 250 - (outsideRadius - 5));
		ctx.lineTo(300 + 0, 250 - (outsideRadius - 13));
		ctx.lineTo(300 - 9, 250 - (outsideRadius - 5));
		ctx.lineTo(300 - 4, 250 - (outsideRadius - 5));
		ctx.lineTo(300 - 4, 250 - (outsideRadius + 5));
		ctx.fill();
	}
}

const rotateWheel = () => {
	spinTime += 30;
	if (spinTime >= spinTimeTotal) {
		stopRotateWheel();
		showResult();
		return;
	}
	var spinAngle =
		spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	startAngle += (spinAngle * Math.PI) / 180;
	drawRouletteWheel();
	spinTimeout = setTimeout("rotateWheel()", 30);
};

const stopRotateWheel = () => {
	clearTimeout(spinTimeout);
	var degrees = (startAngle * 180) / Math.PI + 90;
	var arcd = (arc * 180) / Math.PI;
	var index = Math.floor((360 - (degrees % 360)) / arcd);
	ctx.save();
	ctx.font = "bold 30px Helvetica, Arial";
	res = options[index].number;
	var text = options[index].number;
	ctx.fillText(text, 300 - ctx.measureText(text).width / 2, 250 + 10);
	ctx.restore();
};

const showResult = () => {
	let win = false;
	res = parseInt(res);
	win = win || (odd && res % 2 === 1);
	win = win || (even && res % 2 === 0);
	win = win || (numbers.length > 0 && numbers.includes(res));
	singleOption = options.filter((option) => parseInt(option.number) === res)[0];
	win = win || (black && singleOption.color === "#000");
	win = win || (red && singleOption.color === "#F00");
	win = win || (green && singleOption.color === "#0F0");
	if (win) {
		$("#result").html("WIN! :)");
		$(".resultBar").addClass("win");
		setTimeout(() => {
			$(".resultBar").removeClass("win");
		}, 150);
	} else {
		$("#result").html("LOSS! :(");
		$(".resultBar").addClass("loss");
		setTimeout(() => {
			$(".resultBar").removeClass("loss");
		}, 150);
	}
	let sessionID = Date.now();
	let sessionGame = {
		result: (win ? "Win! :)" : "Loss! :("),
		sessionID: sessionID
	}
	let games = JSON.parse(localStorage.getItem("games"));
	if (games === null)
		games = []
	games.push(sessionGame);
	localStorage.setItem("games", JSON.stringify(games));
};

const easeOut = (t, b, c, d) => {
	var ts = (t /= d) * t;
	var tc = ts * t;
	return b + c * (tc + -3 * ts + 3 * t);
};

drawRouletteWheel();

const handleEven = () => {
	let classList = $("#even").attr("class").split(" ");
	if (classList.includes("btn-outline-primary")) {
		$("#even").removeClass("btn-outline-primary");
		$("#even").addClass("btn-primary");
		even = true;
	} else {
		even = false;
		$("#even").removeClass("btn-primary");
		$("#even").addClass("btn-outline-primary");
	}
};

const handleOdd = () => {
	let classList = $("#odd").attr("class").split(" ");
	if (classList.includes("btn-outline-primary")) {
		$("#odd").removeClass("btn-outline-primary");
		$("#odd").addClass("btn-primary");
		odd = true;
	} else {
		odd = false;
		$("#odd").removeClass("btn-primary");
		$("#odd").addClass("btn-outline-primary");
	}
};

const handleRed = () => {
	let classList = $("#red").attr("class").split(" ");
	if (classList.includes("btn-outline-danger")) {
		$("#red").removeClass("btn-outline-danger");
		$("#red").addClass("btn-danger");
		red = true;
	} else {
		red = false;
		$("#red").removeClass("btn-danger");
		$("#red").addClass("btn-outline-danger");
	}
};

const handleGreen = () => {
	let classList = $("#green").attr("class").split(" ");
	if (classList.includes("btn-outline-success")) {
		$("#green").removeClass("btn-outline-success");
		$("#green").addClass("btn-success");
		green = true;
	} else {
		green = false;
		$("#green").removeClass("btn-success");
		$("#green").addClass("btn-outline-success");
	}
};

const handleBlack = () => {
	let classList = $("#black").attr("class").split(" ");
	if (classList.includes("btn-outline-dark")) {
		$("#black").removeClass("btn-outline-dark");
		$("#black").addClass("btn-dark");
		black = true;
	} else {
		black = false;
		$("#black").removeClass("btn-dark");
		$("#black").addClass("btn-outline-dark");
	}
};

function removeArr(arr) {
	var what,
		a = arguments,
		L = a.length,
		ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax = arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
}

const handleNumber = (n) => {
	let elem = ".number" + n;
	let classList = $(elem).attr("class").split(" ");
	if (classList.includes("btn-outline-warning")) {
		$(elem).removeClass("btn-outline-warning");
		$(elem).addClass("btn-warning");
		numbers.push(n);
	} else {
		removeArr(numbers, n);
		$(elem).removeClass("btn-warning");
		$(elem).addClass("btn-outline-warning");
	}
};

$("#even").on("click", handleEven);
$("#odd").on("click", handleOdd);
$("#red").on("click", handleRed);
$("#green").on("click", handleGreen);
$("#black").on("click", handleBlack);

$(".number").each((index, element) =>
	$(element).on("click", () => handleNumber(index))
);

const handleGamesModal = () => {
	$("#playedGames").html("");
	let games = JSON.parse(localStorage.getItem("games"));
	if (games === null) {
		$("#playedGames").append('<tr><td>No Games Was Played</td></tr>');
	} else {
		$("#playedGames").append("<tr><th>Game ID</th><th>Result</th></tr>");
		games.forEach((game) => {
			$("#playedGames").append("<tr><th>" + game.sessionID + "</th><th>" + game.result + "</th></tr>");
		})
	}
}

$(".gamesButton").on("click", handleGamesModal);