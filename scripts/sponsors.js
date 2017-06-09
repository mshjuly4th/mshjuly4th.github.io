var addSponsor = function(level, name, sponsor) {
	let nLevel;
	switch (level) {
		case "bronze":
			nLevel = 0;
			break;
		case "silver":
			nLevel = 1;
			break;
		case "gold":
			nLevel = 2;
			break;
		case "platinum":
			nLevel = 3;
			break;
		default:
			console.log("Sponsor level was not recognized... Please contact the developer.");
			break;
	}
	if (nLevel == 0) {
		$("#bronzecontainer").append((document.getElementById("bronzecontainer").innerHTML == "" ? "" : "<br>") + sponsor.label);
	} else {
		$("#" + level).after("\
			<a class=\"sponsor\" id=\"" + name + (nLevel >= 2 ? "\" href=\"" + sponsor.link + "\" target=\"_blank" : "") + "\" draggable=\"false\" style=\"-moz-user-select: none;\" ondragstart=\"return false;\">\
				<img class=\"loading sponsorload\" src=\"images/loading.png\" />\
				<img class=\"sponsorimg\" />\
				<div class=\"sponsorinfo\"><span></span>" + sponsor.label + (nLevel >= 2 ? "<br>Contact us!<br>" + sponsor.contact + (nLevel == 3 ? "<br>" + sponsor.blurb : "") : "") + "<span></span></div>\
			</a>\
		");
		let currSponsorImg = $("#" + name + " .sponsorimg")[0];
		// currSponsorImg.draggable = false;
		currSponsorImg.addEventListener('load', function() {
			$("#" + name + " .loading").fadeOut();
			$("#" + name + " .sponsorimg").css("opacity", 1);
			$("#" + name).css("width", "auto");
			// let sponsors = $(".sponsor");
			// for (let i = 0; i < sponsors.length; i++) {
			// 	$(sponsors[i]).css("height", "40vh");
			// 	// setTimeout(300);
			// 	$(sponsors[i]).css("height", $(sponsors[i]).find(".sponsorimg").height());
			// }
		});
		firebase.storage().ref("sponsors/" + sponsor.image).getDownloadURL().then(function(url) {
			currSponsorImg.src = url;
		});
	}
}
$(document).ready(function() {
	// addSponsor("MSH July 4th - Dynamic", "http://test.mshjuly4th.com", "images/TRGlogo.png");
	// $(window).resize(function() {
	// 	let sponsors = $(".sponsor");
	// 	for (let i = 0; i < sponsors.length; i++) {
	// 		$(sponsors[i]).css("height", "40vh");
	// 		// setTimeout(300);
	// 		$(sponsors[i]).css("height", $(sponsors[i]).find(".sponsorimg").height());
	// 	}
	// });
	var ref = firebase.database().ref("sponsors");
	ref.once("value").then(function(ds) {
		var data = ds.val();
		console.log(data);
		for (var level in data) {
			for (var s in data[level]) {
				var sponsor = data[level][s];
				addSponsor(level, s, sponsor);
			}
		}
	});
});
