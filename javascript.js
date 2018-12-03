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

function HttpPost(url, callback) {
	var http = new XMLHttpRequest();
	/*fromTime = "2018-06-10T14:26:00Z";*/
	var params = "[{\"variables\":{\"channelLogin\":\"" + streamer + "\",\"limit\":20,\"before\":null,\"after\":\"" + fromTime + "\",\"sortOrder\":\"ASC\",\"following\":true},\"extensions\":{},\"operationName\":\"EventsPage_EventScheduleQuery\",\"query\":\"query EventsPage_EventScheduleQuery($channelLogin: String!, $limit: Int, $cursor: Cursor, $before: Time, $after: Time, $following: Boolean!, $sortOrder: SortOrder) {  user(login: $channelLogin) {    id    eventLeaves(first: $limit, after: $cursor, criteria: {endsBefore: $before, endsAfter: $after, sortOrder: $sortOrder}) {      pageInfo {        hasNextPage        __typename      }      edges {        cursor        node {          id          self @include(if: $following) {            isFollowing            __typename          }          ... on EventLeaf {            title            startAt            endAt            game {              id              displayName              __typename            }            channel {              id              login              displayName              __typename            }            imageURL(width: 320, height: 180)            __typename          }          __typename        }        __typename      }      __typename    }    __typename  }}\"},{\"operationName\":\"ChannelPage_ChannelInfoBar_User_RENAME1\",\"variables\":{\"login\":\"" + streamer + "\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"af26d8d34bc0a201c463bd83b00b07d48c6dd7595993aad579cb5a8347386f83\"}}},{\"operationName\":\"VideoMarkersChatCommand\",\"variables\":{\"channelLogin\":\"" + streamer + "\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"c65f8b33e3bcccf2b16057e8f445311d213ecf8729f842ccdc71908231fa9a78\"}}}]";
	http.open('POST', url, true);
	/*kérésküldés*/
	http.setRequestHeader('Client-ID', ApiKey);
	http.setRequestHeader('Content-type', 'application/json');
	http.send(params);
	http.onreadystatechange = function () {
		if (http.readyState == 4) {
			if (http.status == 200) {
				callback(http.responseText);
			} else {
				document.getElementById("no_stream").innerHTML = "<img src=\"" + offlinePic + "\" alt=\"23\" width=\"320\"><br><h3 style=\"font-family:rockwell; color:grey\">" + offlineText + "</h3>";
				internetStatus = "offline";
			}
		}
	}
}
var events, eventsLength, todayEventsCount;
HttpPost("https://gql.twitch.tv/gql", EventsArray2);

function EventsArray2(data) {
	events = data;
    events = JSON.parse(events);
    

	events = events["0"].data.user.eventLeaves.edges;
    eventsLength = events.length;
    var currentDay = CurrentDay();

    todayEventsCount=0;
	for (var i = 0; i < eventsLength; i++) {
    
        if(Timestamp(events[i].node.startAt) == currentDay) {
            todayEventsCount++;
        }
	}
    if(todayEventsCount>0) {document.getElementById("text").innerHTML = "Lesz!";} else {document.getElementById("text").innerHTML = "Nem!";}

}
