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
var userSelectedSlide = null;
var changeSlide = function() {
	currSlide = (currSlide + 1) % slides.length;
}
var transSlide = function() {
	$("#slide img[slide=\"" + ((currSlide - 1) % slides.length) + "\"]").css("opacity", 0);
	$("#slide img[slide=\"" + currSlide + "\"]").css("opacity", 1).removeClass("fade").delay(100);
	if (userSelectedSlide == currSlide || userSelectedSlide == (currSlide + 1) % slides.length) userSelectedSlide = null;
	else if (userSelectedSlide != null) {
		//Just a version of the code above.
		endSlideshow();
		$("#slide img[slide=\"" + currSlide + "\"]").css("z-index", -1);
		currSlide = userSelectedSlide;
		userSelectedSlide = null;
		$("#slide img[slide=\"" + currSlide + "\"]")
			.css("z-index", 0)
			.addClass("fade")
			.delay(100)
			.on("animationend", transSlide);
		startSlideshow();
	}
}
var startSlideshow = function() {
	slideInterval = setInterval(function() {
		$("#slide img[slide=\"" + currSlide + "\"]").css("z-index", -1);
		changeSlide();
		$("#slide img[slide=\"" + currSlide + "\"]")
			.css("z-index", 0)
			.addClass("fade")
			.on("animationend", transSlide);
	}, slideTime);
}
var endSlideshow = function() {
	clearInterval(slideInterval);
}
$('document').ready(function() {
	applyShadow(window.scrollY);
	window.addEventListener('scroll', function(e) {
		applyShadow(window.scrollY);
	});
	for (let i = 0; i < slides.length; i++) {
		$("#slide").append("<img slide=" + i + " src=\"" + slides[i] + "\" />");
		$("#pickcontainer").append("<div class=\"slidepick\" slide=" + i + "></div>")
	}
	$("#slide img:not(#slide img[slide=\"0\"])").css("z-index", -1).css("opacity", 0);
	$("#slide img[slide=\"0\"]").css("z-index", 0).css("opacity", 1);
	startSlideshow();
	$(".slidepick").click(function() {
		userSelectedSlide = parseInt($(this).attr("slide"));
	})
	// $(".slidepick").click(function() {
	// 	currSlide = parseInt($(this).attr("slide"));
	// 	if ($("#swap0").hasClass("fade")) {
	// 		$("#swap0").removeClass("fade");
	// 	}
	// 	endSlideshow();
	// 	startSlideshow();
	// });
});

