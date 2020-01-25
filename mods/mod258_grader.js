function average(scores) {
	let sum = 0;
	for(let i=0; i<scores.length; i++) {
		sum += scores[i];
	}
	return Math.round(sum/scores.length);
};

let scores = [90, 98, 89, 100, 100, 86, 94];
let scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(average(scores));
console.log(average(scores2));
