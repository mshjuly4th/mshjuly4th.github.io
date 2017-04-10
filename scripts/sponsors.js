var addSponsor = function(label, link, img) {
	$("#sponsorcontainer").append("\
		<a class=\"sponsor\" href=\"" + link + "\">\
			<img class=\"sponsorimg\" src=\"" + img + "\" />\
			<div class=\"sponsorinfo\">" + label + "</div>\
		</a>\
	");
}
$(document).ready(function() {
	// addSponsor("MSH July 4th - Dynamic", "http://test.mshjuly4th.com", "images/TRGlogo.png");
	var ref = firebase.database().ref("sponsors");
	ref.once("value").then(function(ds) {
		var data = ds.val();
		console.log(data);
		for (var level in data) {
			for (var s in data[level])
			var sponsor = data[level][s];
			addSponsor(sponsor.label, sponsor.link, "images/TRGlogo.png");
		}
	});
});