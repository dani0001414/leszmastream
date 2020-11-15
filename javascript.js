/**Oszt lesz Ma Sztrím???*/
scriptVersion = "1.0";

/*Streamer adatok megadása*/
var streamer = "wearethevr";
var twitchLink = "https://www.twitch.tv/" + streamer;
var noEventsPic = "https://i.imgur.com/5dZn6sc.png";
var offlinePic = "https://i.imgur.com/5dZn6sc.png";
var ApiKey = "kimne78kx3ncx6brgo4mv6wki5h1ko";

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

function CurrentTime() {
	var currentMillisecTimestamp = new Date().getTime();
	return currentMillisecTimestamp / 1000;
}

function CurrentDay() {
	var nd = new Date();
	var utc = nd.getTime() + (nd.getTimezoneOffset() * 60000);
	var now = new Date(utc);
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var currentMillisecTimestamp = startOfDay.getTime();
	return currentMillisecTimestamp / 1000;
}

function Timestamp(b) {
	var twitchServerTime = b.substring(0, b.search("T"));
	var utcDate = twitchServerTime;
//	var d = new Date(utcDate);
    var localDate = new Date(utcDate);
    var offset = localDate.getTimezoneOffset()*60;
    var localDate = localDate.getTime() / 1000;
    localDate = localDate + offset;
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

var events, eventsLength, todayEventsCount;

HttpGetFeature("https://dani0001414.github.io/mm.json", eventsDataGet)

function eventsDataGet(data) {
    events = JSON.parse(data);
	eventsLength = events.length;
	
	var currentDay = CurrentDay();

    todayEventsCount=0;
	for (var i = 0; i < eventsLength; i++) {
    
        if(Timestamp(events[i].event_start_unix) == currentDay) {
            todayEventsCount++;
        }
	}
    if(todayEventsCount>0) {document.getElementById("text").innerHTML = "Lesz!";} else {document.getElementById("text").innerHTML = "Nem!";}

    /*Változtatás : Ha az events tömb nem nulla akkor az első elem kezdési és végetérési időpontját beletesszük a streamEndZeroElement és a streamStartZeroElement változókba. */
   /* if (eventsLength != 0) {
        streamEndZeroElement = Timestamp(events[0].event_end_unix);
        streamStartZeroElement = Timestamp(events[0].event_start_unix);
        if (eventsLength > 1) {
            stramStartFirstElement = Timestamp(events[1].event_start_unix);
            streamEndFirstElement = Timestamp(events[1].event_end_unix);
        }
    }

    HtmlStart();*/
}

