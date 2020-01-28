const request = require('request');
request("http://www.google.com", function(error, response, body) {
	if(error) {
		console.error('error: ', error);
	} else {
		console.log("statusCode: ", response && response.statusCode);
		if(response.statusCode === 200) {
			console.log("body: ", body);
		}
	}
});