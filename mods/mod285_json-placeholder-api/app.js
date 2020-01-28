const request = require('request');
request("https://jsonplaceholder.typicode.com/users", (error, response, body) => {
	if(!error && (response.statusCode === 200)) {
		let json = JSON.parse(body);
		json.forEach(function(entry) {
			console.log(`${entry.name} lives in ${entry.address.city} and works at ${JSON.stringify(entry.company.name)}`);
		});
	}
});