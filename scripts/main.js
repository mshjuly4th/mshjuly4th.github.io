var shadow;
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
	applyShadow(window.scrollY);
	window.addEventListener('scroll', typeof homePage != "undefined" ?
		function(e) {
			let fullLogoHeight = $("#fulllogo").height();
			let change = applyShadow(window.scrollY - fullLogoHeight); //Assuming fulllogo is at the top
			// console.log(window.scrollY - fullLogoHeight);
			if (change && window.scrollY - fullLogoHeight <= 0) {
				document.getElementById("navbar").style = "width: auto; height: 10vh; position: static; border-bottom: 2px solid #EBEBEB";
				document.getElementById("spacer").style = "display: none;";
			} else if (change && window.scrollY - fullLogoHeight > 0) {
				document.getElementById("navbar").style = "";
				document.getElementById("spacer").style = "";
			}
		}
		:
		function(e) {
			applyShadow(window.scrollY);
		}
	);
});