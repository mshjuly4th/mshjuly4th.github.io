var shadow;
const shadowProp = '0px 1px 20px 0px black';
const slides = ["images/IMG_1239.JPG", "images/IMG_1242.JPG", "images/IMG_9023.JPG", "images/IMG_9035.JPG", "images/IMG_9280.JPG"];
const slideTime = 5000;
//var swap = [document.getElementById("swap0"), document.getElementById("swap1")];
var currSlide = 0;
var applyShadow = function(currScroll) {
	if (shadow == undefined) shadow = currScroll == 0;
	if (shadow && currScroll == 0) {
		document.getElementById("navbar").className = document.getElementById("navbar").className.replace(/(?:^|\s)shadowed(?!\S)/g , ''); //Remove shadow with regex
		//$("#navbar").css("box-shadow", "none");
		shadow = false;
	} else if (!shadow && currScroll != 0) {
		document.getElementById("navbar").className += " shadowed"; //Add shadow
		//$("#navbar").css("box-shadow", shadowProp);
		shadow = true;
	}
};
var slideInterval;

var startSlideshow = function() {
	currSlide = (currSlide + 1) % slides.length;
	document.getElementById("swap0").src = slides[currSlide];
	$("#swap0").addClass("fade");
	$("#swap0").on("animationend", function() {
		document.getElementById("swap1").src = slides[currSlide];
		$("#swap0").css("opacity", 0);
		$("#swap0").removeClass("fade");
	});
	slideInterval = setInterval(function() {
		currSlide = (currSlide + 1) % slides.length;
		document.getElementById("swap0").src = slides[currSlide];
		$("#swap0").addClass("fade");
		$("#swap0").on("animationend", function() {
			document.getElementById("swap1").src = slides[currSlide];
			$("#swap0").css("opacity", 0);
			$("#swap0").removeClass("fade");
		});
	}, slideTime);
}
var endSlideshow = function() {
	clearInterval(slideInterval);
}
$('document').ready(function() {
	document.getElementById("swap1").src = slides[currSlide];
	applyShadow(window.scrollY);
	window.addEventListener('scroll', function(e) {
		applyShadow(window.scrollY);
	});
	for (let i = 0; i < slides.length; i++) {
		$("#pickcontainer").append("<div class=\"slidepick\" slide=" + i + "></div>")
	}
	startSlideshow();
	$(".slidepick").click(function() {
		currSlide = parseInt($(this).attr("slide"));
		if ($("#swap0").hasClass("fade")) {
			$("#swap0").removeClass("fade");
		}
		endSlideshow();
		startSlideshow();
	});
});

