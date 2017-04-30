$(document).ready(function() {
	var ref = firebase.database().ref("FAQ");
	ref.once("value").then(function(ds) {
		var data = ds.val();
		for (let i = 0; i < data.length; i++) {
			let question = data[i].q.replace(/\[(.+)\]\((.+)\)/g, function (match, $1, $2, offset, original) {return "<a href=\"" + $2 + "\">" + $1 + "</a>";});
			let answer = data[i].a.replace(/\[(.+)\]\((.+)\)/g, function (match, $1, $2, offset, original) {return "<a href=\"" + $2 + "\">" + $1 + "</a>";});
			$("#faq-container").append("<li class=\"question\" style=\"display: none;\">" + question + "<ul class=\"answer\"><li>" + answer + "</li></ul></li>");
			$(".question").fadeIn();
		}
	});
});