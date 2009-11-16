var baseMapUrl = 'http://maps.google.com/maps?q=';
var ipUrl = 'http://vietmap.info/geoip/api/locate.php?method=ajax&callback=?';
var mapUrl = baseMapUrl;
var intervalId = 0;

$(document).ready(function() {
	startPolling(30);	//refresh every 30 minutes
	
	$('#content').click(function() {
		window.open(mapUrl);
	});
	
	$('#content').rightClick(function() {
		getIP();
	});
});

function startPolling(mins) {
	getIP();
	intervalId = setInterval(getIP, mins * 60 * 1000);
}

function stopPolling() {
	clearInterval(intervalId);
}

function getIP() {
	$('#content').text('Getting IP...');
	$.jsonp(
		{
			url: ipUrl, 
			callbackParameter: 'callback',
			timeout: 30000,
			success: displayIP,
			error: displayError
		}
	);
}

function displayIP(place) {
	if(place) {
		$('#content').text(place.ip).attr('title', (place.city ? place.city + ', ' : '') + (place.country ? place.country : ''));
		if(place.lat && place.lng) {
			mapUrl = baseMapUrl + '@' + place.lat + ',' + place.lng;
		}
		else {
			mapUrl = baseMapUrl + (place.city ? place.city + ', ' : '') + (place.country ? place.country : '');
		}
	}
}

function displayError() { 
	$('#content').text('Error occured').attr('title', 'could not get your IP - make sure you are connected'); 
}