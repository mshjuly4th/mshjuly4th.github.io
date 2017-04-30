var eventDetails;
$(document).ready(function() {
	if (typeof eventDetails == "undefined") {
		var ref = firebase.database().ref('eventInfo');
		ref.once("value").then(function(ds) {
			eventDetails = ds.val();
			// console.log(eventDetails.schedule);
			for (let i = 0; i < eventDetails.schedule.length; i++) {
				let event = eventDetails.schedule[i];
				$("#schedule > tbody").append("<tr>\
					<td><h2>" + event.title + "</h2>" + event.description + "</td>\
					<td><h2>" + event.time + "</h2></td>\
					<td><h2>" + event.location + "</h2></td>\
					</tr>");
			}
		});
	}
});