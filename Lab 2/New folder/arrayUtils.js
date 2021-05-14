const mean = function mean(arr) {
	if(arr == null){
		throw "no input";
	}
	else if(!(Array.isArray(arr))) {
		throw "not array";
	}
	else if(arr.length == 0) {
		throw "arrray len 0";
	}
	else if(!(arguments.length == 1)) {
		throw "too many arguments";
	}
	else {
		let x = 0;
		let allnum = true;
		for (let i of arr) {
			if(!(Number.isInteger(i))) {
				allnum = false;
			}
		}
		if (allnum) {
			arr.forEach(e => x = x + e);
			return x/arr.length;
		}
		else {
			throw "not all numbers";
		}
	}
}
const medianSquared = function medianSquared(arr) {
	if(arr == null){
		throw "no input";
	}
	else if(!(Array.isArray(arr))) {
		throw "not array";
	}
	else if(arr.length == 0) {
		throw "arrray len 0";
	}
	else if(!(arguments.length == 1)) {
		throw "too many arguments";
	}
	else {
		let x = 0;
		let allnum = true;
		for (let i of arr) {
			if(!(Number.isInteger(i))) {
				allnum = false;
			}
		}
		if (allnum) {
			let sarr = arr.sort();
			let larr = arr.length;
			let middle = larr / 2;
			let f = 0;
			if(larr % 2 == 0) {
				f = ((sarr[middle] + sarr[middle - 1]) / 2);
			}
			else {
				f = sarr[Math.ceil(middle - 1)];
			}
			return (f * f);
		}
		else {
			throw "not all numbers";
		}
	}
}
const maxElement = function maxElement(arr) {
	if(arr == null){
		throw "no input";
	}
	else if(!(Array.isArray(arr))) {
		throw "not array";
	}
	else if(arr.length == 0) {
		throw "arrray len 0";
	}
	else if(!(arguments.length == 1)) {
		throw "too many arguments";
	}
	else {
		let x = 0;
		let allnum = true;
		for (let i of arr) {
			if(!(Number.isInteger(i))) {
				allnum = false;
			}
		}
		if (allnum) {
			let maxn = -9007199254740990;
			let c = 0;
			let maxc = 0;
			for (let j of arr) {
				if(j > maxn) {
					maxn = j;
					maxc = c;
				}
				c = c + 1;
			}
			let fin = {};
			fin[maxn] = maxc;
			return fin;
		}
		else {
			throw "not all numbers";
		}
	}
}
const fill = function fill(end, value) {
	let r = [];
	if(end == null){
		throw "no input";
	}
	else if(!(Number.isInteger(end))) {
		throw "not a number";
	}
	else if(end < 1) {
		throw "first arguement end must be 1 or greater";
	}
	else if(arguments.length == 1) {
		for (let i = 0; i < end; i++) {
			r.push(i);
		}
		return r;
	}
	else if(arguments.length == 2) {
		if(typeof value === 'null') {
			throw "error with second argument value";
		}
		for (let i = 0; i < end; i++) {
			r.push(value);
		}
		return r;
	}
	else {
		throw "too many arguments";
	}
}
const countRepeating = function countRepeating(arr) {//NOT DONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	let fino = new Object();
	let dcon = [];
	if(arr == null){
		throw "no input";
	}
	else if(!(Array.isArray(arr))) {
		throw "not array";
	}
	else if(arr.length == 0) {
		return fino;
	}
	else if(!(arguments.length == 1)) {
		throw "too many arguments";
	}
	else {
		for (let i of arr) {
			if((typeof i === 'string') || (Number.isInteger(i))) {
				if(dcon.includes(i)) {
					//console.log(i);
					if(fino[i]) {
						//console.log(i);
						fino[i] = fino[i] + 1;
					}
					else {
						//console.log(i);
						fino[i] = 2;
						//console.log(fino);
					}
				}
				else {
					if(Number.isInteger(i)) {
						dcon.push(i.toString())
					}
					else {
						dcon.push(i);
					}
				}
			}
			else {
				return "Array must contain only numbers or strings";
			}
		}
	}
	return fino;
}

const isEqual = function isEqual(arrayOne, arrayTwo) {//NOT DONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if(arrayOne == null){
		throw "no input";
	}
	else if(arrayTwo == null){
		throw "Only one array";
	}
	else if(!(Array.isArray(arrayOne))) {
		throw "arrayOne is not an array";
	}
	else if(!(Array.isArray(arrayTwo))) {
		throw "arrayTwo is not an array";
	}
	else if(arguments.length > 2) {
		throw "too many arguments";
	}
	else if(arrayOne.length == arrayTwo.length) {
		arrayOne.sort();
		arrayTwo.sort();
		for (let i = 0; i < arrayOne.length; i++) {
			if (Array.isArray(arrayOne[i]) && Array.isArray(arrayTwo[i])) {
				if (isEqual(arrayOne[i], arrayTwo[i])) {
					//should have done this better, just do nothing here
				}
				else {
					return false;
				}
			}
			else if (arrayOne[i] === arrayTwo[i]) {
				//should have done this better, just do nothing here
			}
			else {
				return false;
			}
		}
		return true;
	}
	else {
		return false;
	}
}
//console.log(isEqual([1, 2, 3], [3, 1, 2])); // Returns: true
//console.log(isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z'])); // Returns: true
//console.log(isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
//console.log(isEqual([1, 3, 2], [1, 2, 3, 4])); // Returns: false
//console.log(isEqual([1, 2], [1, 2, 3])); // Returns: false
//console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]])); // Returns: true
//console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]])); // Returns: false
//console.log(isEqual([null, null, null], [null, null, null])); // Returns: true


module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
    mean,
	medianSquared,
	maxElement,
	fill,
	countRepeating,
	isEqual
};