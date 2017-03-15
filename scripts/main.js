var shadow;
const shadowProp = '0px 1px 20px 0px black';
var applyShadow = function(currScroll) {
	if (shadow == undefined) shadow = currScroll == 0;
	if (shadow && currScroll == 0) {
		//document.getElementById("navbar").className = document.getElementById("navbar").className.replace(/(?:^|\s)shadowed(?!\S)/g , ''); //Remove shadow with regex
		$("#navbar").css("box-shadow", "none");
		shadow = false;
	} else if (!shadow && currScroll != 0) {
		//document.getElementById("navbar").className += " shadowed"; //Add shadow
		$("#navbar").css("box-shadow", shadowProp);
		shadow = true;
	}
};
$('document').ready(function() {
	applyShadow(window.scrollY);
	window.addEventListener('scroll', function(e) {
		applyShadow(window.scrollY);
	});
});