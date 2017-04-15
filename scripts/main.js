var shadow, fullLogo;
//Debouncing function taken from Underscore.js
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
//Returns if a change in shadow occurred.
var navControl = function(currScroll) {
	if (shadow == undefined) shadow = currScroll <= 0;
	if (shadow && currScroll <= 0) {
		$("#navbar").removeClass("shadowed");
		// document.getElementById("navbar").className = document.getElementById("navbar").className.replace(/(?:^|\s)shadowed(?!\S)/g , ''); //Remove shadow with regex
		//$("#navbar").css("box-shadow", "none");
		shadow = false;
	} else if (!shadow && currScroll > 0) {
		$("#navbar").addClass("shadowed");
		// document.getElementById("navbar").className += " shadowed"; //Add shadow
		//$("#navbar").css("box-shadow", shadowProp);
		shadow = true;
	} else return false;
	return true;
};
var navControlHome = function(currScroll) {
	let fullLogoHeight = fullLogo.height();
	let change = navControl(currScroll - fullLogoHeight); //Assuming fulllogo is at the top
	// console.log(currScroll - fullLogoHeight);
	if (change && currScroll - fullLogoHeight <= 0) {
		$("#navbar").addClass("stat");
		$("#spacer").addClass("invis");
	} else if (change && currScroll - fullLogoHeight > 0) {
		$("#navbar").removeClass("stat");
		$("#spacer").removeClass("invis");
	}
}
$(document).ready(function() {
	if (typeof homePage != "undefined") {
		fullLogo = $("#fulllogo");
		navControlHome(window.scrollY);
	} else {
		navControl(window.scrollY);
	}
	window.addEventListener('scroll', (typeof homePage != "undefined" ?
		function(e) {
			navControlHome(window.scrollY);
		}
		:
		function(e) {
			navControl(window.scrollY);
		})
	);
});