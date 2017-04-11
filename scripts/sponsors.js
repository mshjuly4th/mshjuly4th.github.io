var addSponsor = function(level, name, label, link, img) {
	$("#" + level).after("\
		<a class=\"sponsor\" id=\"" + name + "\" href=\"" + link + "\">\
			<img class=\"loading sponsorload\" src=\"images/loading.png\" />\
			<img class=\"sponsorimg\" />\
			<div class=\"sponsorinfo\">" + label + "</div>\
		</a>\
	");
	$("#" + name + " .sponsorimg")[0].addEventListener('load', function() {
		$("#" + name + " .loading").fadeOut();
		$("#" + name + " .sponsorimg").css("opacity", 1);
	});
	firebase.storage().ref("sponsors/" + img).getDownloadURL().then(function(url) {
		$("#" + name + " .sponsorimg")[0].src = url;
	});
}
$(document).ready(function() {
	// addSponsor("MSH July 4th - Dynamic", "http://test.mshjuly4th.com", "images/TRGlogo.png");
	var ref = firebase.database().ref("sponsors");
	ref.once("value").then(function(ds) {
		var data = ds.val();
		console.log(data);
		for (var level in data) {
			for (var s in data[level]) {
				var sponsor = data[level][s];
				addSponsor(level, s, sponsor.label, sponsor.link, sponsor.image);
			}
		}
	});
});