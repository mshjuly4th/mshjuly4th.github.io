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
var applyShadow = function(currScroll) {
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
$(document).ready(function() {
	if (typeof homePage != undefined) {
		fullLogo = $("#fulllogo");
		// console.log(fullLogo[0]);
		applyShadow(window.scrollY - fullLogo.height());
	} else {
		applyShadow(window.scrollY);
	}
	window.addEventListener('scroll', (typeof homePage != "undefined" ?
		function(e) {
			let fullLogoHeight = fullLogo.height();
			let change = applyShadow(window.scrollY - fullLogoHeight); //Assuming fulllogo is at the top
			// console.log(window.scrollY - fullLogoHeight);
			if (change && window.scrollY - fullLogoHeight <= 0) {
				$("#navbar").addClass("stat");
				$("#spacer").addClass("invis");
			} else if (change && window.scrollY - fullLogoHeight > 0) {
				$("#navbar").removeClass("stat");
				$("#spacer").removeClass("invis");
			}
		}
		:
		function(e) {
			applyShadow(window.scrollY);
		})
	);
});