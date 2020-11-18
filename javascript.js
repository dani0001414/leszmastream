/**Oszt lesz Ma Sztrím???*/
scriptVersion = "1.0";

/*Streamer adatok megadása*/
var streamer = "wearethevr";
var twitchLink = "https://www.twitch.tv/" + streamer;
var ApiKey = "kimne78kx3ncx6brgo4mv6wki5h1ko";
var offlineText = "<font size=\"6\">Valamiért nem érem el a Twitch Szervereit! Próbáld újra tölteni.</font>";

var fromTime = CurrentTimeTwitchServerFormat(0);

function CurrentTimeTwitchServerFormat(offset) {
	/*Szerveridőbe konvertál*/
	var nd = new Date();
	var utc = nd.getTime() + (nd.getTimezoneOffset() * 60000);
	var d = new Date(utc + (3600000 * offset));
	var hour = d.getHours();
	var min = d.getMinutes();
	var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	var serverTime = d.getFullYear() + "-" + months[d.getMonth()] + "-" + days[d.getDate()] + "T" + days[hour] + ":" + days[min] + ":00Z";
	return serverTime;
}

function CurrentDay() {
	var now = new Date();
	//var now = new Date();
	var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var currentMillisecTimestamp = startOfDay.getTime();
	return currentMillisecTimestamp / 1000;
}

function Timestamp(b) {
	var twitchServerTime = b.substring(0, 16) + ":00Z";
	var localDate = new Date(twitchServerTime);
	var startOfDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
	var localDate = startOfDay.getTime() / 1000;
	return localDate;
}

function HttpGetFeature(url, callback) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(xhttp.responseText);

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}
var events, eventsLength, todayEventsCount,liveStatus;

HttpGetFeature("https://script.google.com/macros/s/AKfycbwNIIdxzydP9Xa85GHqXI6jxZwAJ9a7Er8HKk0dtyl-u_gcOUu8/exec?streamer=wearethevr", liveData);

function liveData(data)
{
	liveData = data;
    liveData = JSON.parse(liveData);
    coverLive = null;
    titleLive = null;
    liveStatus = null;
    gameLiveStatus = null;
    if (liveData.data.length > 0) {
        coverLive = liveData.data['0'].thumbnail_url;
        titleLive = liveData.data['0'].title;
        liveStatus = liveData.data['0'].type;
	}
	HttpGetFeature("https://dani0001414.github.io/mm.json", eventsDataGet)
}



function eventsDataGet(data,liveStatus) {
    events = JSON.parse(data);
	eventsLength = events.length;
	
	var currentDay = CurrentDay();
	
	var liveStatus ="live";
	if(liveData == null) {
        liveStatus=null;
    } else if(liveData.title == null){
        liveStatus=null;
	}
	
	todayEventsCount = 0;
	for (var i = 0; i < eventsLength; i++) {
		var brakeTitle = events[i].event_title;
		var breakIndicator = brakeTitle.search("SZÜNET");

		if ((Timestamp(events[i].event_start_unix) == currentDay) & (breakIndicator < 0)) {
			todayEventsCount++;
		}
	}
	if (liveStatus != null) { document.getElementById("text").innerHTML = "<a target=\"_blank\" href=\"https://www.twitch.tv/wearethevr\">ÉPP MOST MEGY! 👀</a>"; } else {
		if (todayEventsCount > 0) { document.getElementById("text").innerHTML = "<a target=\"_blank\" href=\"https://thevr.hu/mm/mm.html\">Lesz!</a>"; } else { document.getElementById("text").innerHTML = "Nem!"; }
	}

}
