var addSponsor = function(label, link, img) {
	$("#sponsorcontainer").append("\
		<a class=\"sponsor\" href=\"" + link + "\">\
			<img class=\"sponsorimg\" src=\"" + img + "\" />\
			<div class=\"sponsorinfo\">" + label + "</div>\
		</a>\
	");
}
$(document).ready(function() {
	addSponsor("M&amp;SH July 4th - Dynamic", "http://test.mshjuly4th.com", "images/TRGlogo.png");
});