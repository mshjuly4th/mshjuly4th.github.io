var eventDetails;
$(document).ready(function() {
	if (typeof eventDetails == "undefined") {
		var ref = firebase.database().ref('eventInfo');
		ref.once("value").then(function(ds) {
			eventDetails = ds.val();
			// console.log(eventDetails.schedule);
			for (let event of eventDetails.schedule) {
				$("#schedule > tbody").append("<tr>\
					<td>" + event.title + " - " + event.description + "</td>\
					<td>" + event.time + "</td>\
					<td>" + event.location + "</td>\
					</tr>");
			}
		});
	}
});