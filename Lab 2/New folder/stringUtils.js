const camelCase = function camelCase(string) {
	if(string == null){
		throw "no input";
	}
	else if(!(typeof string === "string")) {
		throw "not a string";
	}
	else if(string.length == 0) {
		throw "string len 0";
	}
	else if(arguments.length > 1) {
		throw "too many arguments";
	}
	else {
		let notallspace = false;
		let retst = "";
		for (let i = 0; i < string.length; i++) {
			if (string[i] != ' ') {
				notallspace = true;
			}
		}
		if(notallspace) {
			lstr = string.toLowerCase();
			let capper = false;
			for (let i = 0; i < lstr.length; i++) {
				if ((lstr[i] != ' ') && (capper)) {
					retst += lstr[i].toUpperCase();
					capper = false;
				}
				else if ((lstr[i] != ' ') && !(capper)) {
					retst += lstr[i];
				}
				else if (lstr[i] = ' ') {
					capper = true;
				}
			}
			return retst;
		}
		else {
			throw "string is just spaces";
		}
	}
}
const replaceChar = function replaceChar(string) {
	if(string == null){
		throw "no input";
	}
	else if(!(typeof string === "string")) {
		throw "not a string";
	}
	else if(string.length == 0) {
		throw "string len 0";
	}
	else if(arguments.length > 1) {
		throw "too many arguments";
	}
	else {
		let notallspace = false;
		for (let i = 0; i < string.length; i++) {
			if (string[i] != ' ') {
				notallspace = true;
			}
		}
		if(notallspace) {
			let retme = "";
			let swaps = true;
			let firU = string.charAt(0).toUpperCase();
			let firL = string.charAt(0).toLowerCase();
			retme += string[0];
			for (let i = 1; i < string.length; i++) {
				if (string[i] == firU || string[i] == firL) {
					if(swaps) {
						retme += '*';
						swaps = false;
					}
					else {
						retme += '$';
						swaps = true;
					}
				}
				else {
					retme += string[i];
				}
			}
			return retme;
		}
		else {
			throw "string is just spaces";
		}
	}
}
const mashUp = function mashUp(string1, string2) {
	if(string1 == null || string2 == null){
		throw "missing input";
	}
	else if(!(typeof string1 === "string") || !(typeof string2 === "string")) {
		throw "not a string";
	}
	else if(string1.length == 0 || string2.length == 0) {
		throw "string len 0";
	}
	else if(string1.length < 2 || string2.length < 2) {
		throw "both string lengths must be more than 2";
	}
	else if(arguments.length > 2) {
		throw "too many arguments";
	}
	else {
		let notallspace1 = false;
		let notallspace2 = false;
		for (let i = 0; i < string1.length; i++) {
			if (string1[i] != ' ') {
				notallspace1 = true;
			}
		}
		for (let i = 0; i < string2.length; i++) {
			if (string2[i] != ' ') {
				notallspace2 = true;
			}
		}
		if(notallspace1 && notallspace2) {
			retme = "";
			retme += string2[0]
			retme += string2[1]
			for (let i = 2; i < string1.length; i++) {
				retme += string1[i];
			}
			retme += " ";
			retme += string1[0];
			retme += string1[1]
			for (let i = 2; i < string2.length; i++) {
				retme += string2[i];
			}
			return retme;
		}
		else {
			throw "string is just spaces";
		}
	}
}





module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
    camelCase,
	replaceChar,
	mashUp
};