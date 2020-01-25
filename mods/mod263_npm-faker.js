var faker = require('faker');
console.log("====================\nWELCOME TO MY SHOP!\n====================");
for(let i=0; i<10; i++) {
	console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}
console.log("====================");
console.log(faker.helpers.createCard());
