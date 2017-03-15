var shadow;
var applyShadow = function(currScroll) {
	if (shadow == undefined) shadow = currScroll == 0;
	else if (shadow && currScroll == 0) {
		document.getElementById("navbar").className = document.getElementById("navbar").className.replace(/(?:^|\s)shadowed(?!\S)/g , ''); //Remove shadow with regex
		shadow = false;
	} else if (!shadow && currScroll != 0) {
		document.getElementById("navbar").className += " shadowed"; //Add shadow
		shadow = true;
	}
};
$('document').ready(function() {
	applyShadow(window.scrollY);
	window.addEventListener('scroll', function(e) {
		applyShadow(window.scrollY);
	});
});