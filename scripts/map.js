var eventDetails, markers, map;
var markMapReady = false;
const mapCenter = { //Millburn High School
	lat: 40.7204,
	lng: -74.3157
};
var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: mapCenter
	});
	if (markMapReady) markMap();
}
var markMap = function() {
	let locations = [];
	//Restructure
	for (let loc in eventDetails.locations) {
		locations.push({
			title: loc,
			subtitle: eventDetails.locations[loc].subtitle,
			position: {
				lat: eventDetails.locations[loc].latitude,
				lng: eventDetails.locations[loc].longitude
			}
		});
	}
	var places = [];
	for (let i = 0; i < locations.length; i++) {
		places.push({
			infowindow: new google.maps.InfoWindow({
				content: "<h1>" + locations[i].title + "</h1><br>" + locations[i].subtitle
			}),
			marker: new google.maps.Marker({
				position: locations[i].position,
				map: map,
				title: locations[i].title
			})
		});
		places[i].marker.addListener('click', function() {
			places[i].infowindow.open(map, places[i].marker);
		});
	}
}
if (typeof eventDetails == "undefined") {
	console.log("test");
	var ref = firebase.database().ref('eventInfo');
	ref.once("value").then(function(ds) {
		eventDetails = ds.val();
		console.log(eventDetails);
		if (typeof map != 'undefined') markMap();
		else markMapReady = true; //wait for map
	});
}
