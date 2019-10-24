var app = new Vue({
	el: '#app_root',
	data: {
		songs: []
	},
	methods: {
		// a computed getter
		formatted_time: function (duration) {
			// from https://stackoverflow.com/a/6313032
			// multiply by 1000 because Date() requires miliseconds
			var date = new Date(duration * 1000);

			var hh = date.getUTCHours();
			var mm = date.getUTCMinutes();
			var ss = date.getSeconds();

			if (ss < 10) {ss = "0"+ss;}

			if(hh == 0 && mm == 0){
				return "0:"+ss
			} else {
				if (hh == 0){
					return mm+":"+ss
				} else {
					if (mm < 10) {mm = "0"+mm}
					return hh+":"+mm+":"+ss
				}
			}
		},

		get_songs_sorted_by_duration: function() {
			load_songs('http://127.0.0.1:5000/songs?order_by=song_duration&direction=asc');
		},
	},
	created () {
		// load_songs("http://127.0.0.1:5000/songs");
		load_songs_from_inputs();
	}
})

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {accordion: false});
  });

function handleErrors(response) {
if (!response.ok) {
	try{
		throw Error(res.text())
	} catch(err) {
       console.log('caught it!',err);
    }

    // throw Error(response.statusText);
}
return response;
}

async function load_songs(url){
	console.log("loading songs from " + htmlDecode(url))
  	const response = await fetch(htmlDecode(url));
  	// const handled_response = await handleErrors(response);
	const myJson = await response.json();
	console.log(myJson);
	if (!response.ok){
		message = myJson.message + '<span class="badge red black-text">' + response.status + '</span>'; 
		M.toast({html: message});
	} else {
		app.songs = myJson;
	}
}

function htmlDecode(input){
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
}

function load_songs_from_inputs(){
	url = "http://127.0.0.1:5000/songs";

	params = [];
	if(document.getElementById("year").value != ''){
		params.push("year=" + document.getElementById("year").value);
	}
	if(document.getElementById("artist_id").value != ''){
		params.push("artist_id=" + document.getElementById("artist_id").value);
	}
	if(document.getElementById("order_by").value != ''){
		params.push("order_by=" + document.getElementById("order_by").value);
	}
	if(document.getElementById("treshold").value != ''){
		params.push("treshold=" + document.getElementById("treshold").value);
	}
	if(document.getElementById("direction").value != ''){
		params.push("direction=" + document.getElementById("direction").value);
	}
	if(document.getElementById("count").value != ''){
		params.push("count=" + document.getElementById("count").value);
	}

	param_string = params.join("&");

	url = [url, param_string].join("?");

	load_songs(url);
}

// from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Example POST method implementation:

async function test_fetch(){
	try {
	  const data = await postData('http://127.0.0.1:5000/songs', { answer: 42 });
	  console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
	} catch (error) {
	  console.error(error);
	  console.log(error);
	  console.log('There has been a problem with your fetch operation: ', error.message);
	}
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}