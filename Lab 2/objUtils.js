const makeArrays = function makeArrays(arr) {
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
		//let kes = [];
		let ets = [];
		let ret = [];
		for(let i of arr) {
			if(typeof i === 'object' && i !== null) {
				//kes.push(Object.keys(i));
				ets.push(Object.entries(i));
			}
			else {
				throw "must be object in array";
			}
		}
		for(let i = 0; i < ets.length; i++) {
			for(let j = 0; j < ets[i].length; j++) {
				ret.push(ets[i][j]);
			}
		}
		return ret;
	}
}
const isDeepEqual = function isDeepEqual(obj1, obj2) {//NOT DONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if(obj1 == null){
		throw "no input";
	}
	else if(obj2 == null) {
		throw "missing second input";
	}
	else if(arguments.length > 2) {
		throw "too many arguments";
	}
	else if (typeof obj1 !== 'object' || obj1 == null){
		throw "first input is not object";
	}
	else if (typeof obj2 !== 'object' || obj2 == null){
		throw "second input is not object";
	}
	else if (Object.keys(obj1).length == Object.keys(obj2).length) {
		for(let i in obj1){
			if(typeof obj1[i] === 'object') {
				if ( !isDeepEqual(obj1[i], obj2[i]) ) {
					return false;
				}
			}
			else if(obj1[i] != obj2[i]) {
				return false;
			}
		}
		return true;
	}
	else {
		return false;
	}
}
const computeObject = function computeObject(object, func) {
	if(object == null){
		throw "no input";
	}
	else if(arguments.length > 2) {
		throw "too many arguments";
	}
	else if (!(typeof object === 'object' && object !== null)) {
		throw "first input is not object";
	}
	else if (!(typeof func === 'function')) {
		throw "second input is not function";
	}
	else {
		let kye = Object.keys(object);
		let val = Object.values(object);
		let nal = [];
		if (kye.length < 1) {
			throw "Object must have at least one key/value"
		}
		let allnum = true;
		for (let i of val) {
			if(!(Number.isInteger(i))) {
				allnum = false;
			}
		}
		if (allnum) {
			nal = val.map(func);
		}
		else {
			throw "not all numbers";
		}
		let rte = {};
		kye.forEach((kye, i) => rte[kye] = nal[i]);
		return rte;
	}
}


module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
    makeArrays,
	isDeepEqual,
	computeObject
};