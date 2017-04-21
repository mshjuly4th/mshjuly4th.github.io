$(document).ready(function() {
	var ref = firebase.database().ref("FAQ");
	ref.once("value").then(function(ds) {
		var data = ds.val();
		for (let qa of data) {
			$("#faq-container").append("<li class=\"question\" style=\"display: none;\">" + qa.q + "<ul class=\"answer\"><li>" + qa.a + "</li></ul></li>");
			$(".question").fadeIn();
		}
	});
});