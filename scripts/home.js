const shadowProp = '0px 1px 20px 0px black';
const slides = ["images/gallery.jpg", "images/IMG_1239.JPG", "images/IMG_1242.JPG", "images/IMG_9023.JPG", "images/IMG_9035.JPG", "images/IMG_9280.JPG", "images/IMG_7552.JPG", "images/IMG_7535.JPG", "images/IMG_7516.JPG"];
const slideTime = 3000;
var slidePos = [];
//var swap = [document.getElementById("swap0"), document.getElementById("swap1")];
var currSlide = 0;
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
	// slideInterval = setInterval(function() {
	// 	$("#slide img[slide=\"" + currSlide + "\"]").css("z-index", -1);
	// 	changeSlide();
	// 	$("#slide img[slide=\"" + currSlide + "\"]")
	// 		.css("z-index", 0)
	// 		.addClass("fade")
	// 		.on("animationend", transSlide);
	// }, slideTime);
}
// var processImg = function(n) {
// 	if ($("img[slide=\"" + n + "\"]")[0] == undefined) return;
// 	for (let i = 0; i < n; i++) {
// 		if (imgReady.indexOf(i) == -1) {
// 			if(imgToProc.indexOf(i) != -1) imgToProc.push(n);
// 			return;
// 		}
// 	}
// 	let lastLeft = n == 0 ? 0 : $("li[slide=\"" + (n - 1) + "\"]").css("left");
// 	if (typeof lastLeft == "string") {
// 		console.log($("li[slide=\"" + (n - 1) + "\"]").css("left"));
// 		console.log(lastLeft);
// 		lastLeft = parseInt(lastLeft.substring(0, lastLeft.length - 2));
// 		console.log(lastLeft);
// 	}
// 	// console.log(i == 0 ? "zero" : $("img[slide=\"" + (i - 1) + "\"]")[0].clientWidth);
// 	// $("li[slide=\"" + i + "\"]").css("left", i == 0 ? 0 : lastLeft + $("img[slide=\"" + i + "\"]")[0].clientWidth);
// 	$("li[slide=\"" + n + "\"]").css("left", (n == 0 ? 0 : lastLeft + $("img[slide=\"" + (n - 1) + "\"]")[0].clientWidth) + "px");
// 	imgReady.push(n);
// 	let j = imgToProc.indexOf(n);
// 	if (j != -1) imgToProc.splice(j, 1);
// 	if (n != slides.length - 1) {
// 		for (let i = n + 1; i < slides.length; i++) {
// 			processImg(i);
// 		}
// 	} else {
// 		$("#slideshow").css("width", $("img[slide=\"0\"]").css("width"));
// 	}
// }
var processImg = function() {
	slidePos = [];
	for (let n = 0; n < slides.length; n++) {
		slidePos.push(n == 0 ? 0 : slidePos[n - 1] + $("img[slide=\"" + (n - 1) + "\"]")[0].clientWidth)
		// console.log(i == 0 ? "zero" : $("img[slide=\"" + (i - 1) + "\"]")[0].clientWidth);
		// $("li[slide=\"" + i + "\"]").css("left", i == 0 ? 0 : lastLeft + $("img[slide=\"" + i + "\"]")[0].clientWidth);
		$("li[slide=\"" + n + "\"]").css("left", slidePos[n] + "px");
	}
	$("#slideshow").css("width", $("img[slide=\"" + currSlide + "\"]").css("width"));
	switchSlide(currSlide); //This is for resizing when the slide has already been switched.
}
//This function is just to call both processImg and delete the loading gif
var initSlideshow = function() {
	$("#slideload").fadeOut();
	slideInterval = setInterval(function() {
		switchSlide((currSlide + 1) % slides.length);
	}, slideTime);
	processImg();
	$("#slide > li").css("opacity", 1);
}
var switchSlide = function(slide) {
	currSlide = slide;
	$("#slide").css("transform", "translate(" + -slidePos[currSlide] + "px, 0px)");
	$("#slideshow").css("width", $("img[slide=\"" + currSlide + "\"]")[0].clientWidth);
	$(".slideselected").removeClass("slideselected");
	$(".slidepick[slide=\"" + currSlide + "\"]").addClass("slideselected");
}
var endSlideshow = function() {
	clearInterval(slideInterval);
}
$('document').ready(function() {
	for (let i = 0; i < slides.length; i++) {
		$("#slide").append("<li slide=" + i + "><img slide=" + i + " src=\"" + slides[i] + "\" /></li>");
		// $("img[slide=\"" + i + "\"]").eq(0).on('load', processImg(i));
		// $("img[slide=\"" + i + "\"]")[0].src = slides[i];
		$("#pickcontainer").append("<div class=\"slidepick\" slide=" + i + "></div>")
	}
	$("#slide").waitForImages(initSlideshow);
	$(window).resize(processImg);
	$(".slidepick").click(function() {
		switchSlide(parseInt($(this).attr("slide")));
		if (slideInterval) endSlideshow();
	});
	// $("#slide img:not(#slide img[slide=\"0\"])").css("z-index", -1).css("opacity", 0);
	// $("#slide img[slide=\"0\"]").css("z-index", 0).css("opacity", 1);
	// startSlideshow();
	// $(".slidepick").click(function() {
	// 	userSelectedSlide = parseInt($(this).attr("slide"));
	// });
	// $(".slidepick").click(function() {
	// 	currSlide = parseInt($(this).attr("slide"));
	// 	if ($("#swap0").hasClass("fade")) {
	// 		$("#swap0").removeClass("fade");
	// 	}
	// 	endSlideshow();
	// 	startSlideshow();
	// });
});

