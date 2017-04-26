$(document).ready(function() {
	var ref = firebase.database().ref("FAQ");
	ref.once("value").then(function(ds) {
		var data = ds.val();
		for (let qa of data) {
			let question = qa.q.replace(/\[(.+)\]\((.+)\)/g, function (match, $1, $2, offset, original) {return "<a href=\"" + $2 + "\">" + $1 + "</a>";});
			let answer = qa.a.replace(/\[(.+)\]\((.+)\)/g, function (match, $1, $2, offset, original) {return "<a href=\"" + $2 + "\">" + $1 + "</a>";});
			$("#faq-container").append("<li class=\"question\" style=\"display: none;\">" + question + "<ul class=\"answer\"><li>" + answer + "</li></ul></li>");
			$(".question").fadeIn();
		}
	});
});