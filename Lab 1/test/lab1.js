//to run in cosole type "node lab1.js"
//if (!NULL) check if somehitng is null

/*
let myObj = {
	hell: 'world',
	num: 1,
	bool: true,
	myFn: (text) => text
}
console.log(myObj);

will print
{ hello: 'world, num: 1, bool:true, myFn: [Function: myFn]

to add a new keys
myObj[new-key] = "I'm a new key!"; or myObj.new-key = "I'm a new key!"
*/

const questionOne = function questionOne(arr) {
	let myO = {};
	if(arr === undefined || arr.length == 0) {
		return myO;
	}
	else{
		let cnum;
		let rnum;
		let i;
		let j;
		let checker = true;
		for (i = 0; i < arr.length; i++) {
			checker = true;
			cnum = arr[i]; //DO I HAVE TO TEST NEGITIVS?
			if(cnum == 0 || cnum == 1){
				myO[cnum] = false;
			}
			else if(cnum == 2){
				myO[cnum] = true;
			}
			else{
				for(j = 2; j < cnum; j++){
					rnum = cnum % j;
					if (rnum == 0) {
						myO[cnum] = false;
						checker = false;
					}
				}
				if(checker){
					myO[cnum] = true;
				}
			}
		}
		return myO;
	}
}

const questionTwo = function questionTwo(arr) { 
	let i;
	x = 0;
	for (i = 0; i < arr.length; i++) {
		x = x + (arr[i] * arr[i]);
	}
	x = Math.pow(x, 5);
	x = Math.sqrt(x);
	x = x.toFixed(2) //This makes it a string, make sure thats okay and shiz
	x = parseFloat(x, 10);
	return x;
}

const questionThree = function questionThree(text) {
	
	let l = text.length
	let rtext = text.toLowerCase();
	let numCon = 0
	let numVow = 0
	let numNum = 0
	let numSpa = 0
	let numPun = 0
	let numSch = 0

	if(l == 0) {
		return {
			consonants: 0,
			vowels: 0,
			numbers: 0,
			spaces: 0,
			punctuation: 0,
			specialCharacters: 0}
	}
	else {
		let c;
		let i;
		let cons = new Array('b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z');
		let vows = new Array('a', 'e', 'i', 'o', 'u');
		let nums = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9');
		let puns = new Array('.', '?', '!', ',', ';', ':', '-', '(', ')', '[', ']', '{', '}', "'", '"');//hyphen vs dash wtf???? ALSO Elipsies ...
		let spes = new Array('@', '#', '$', '%', '^', '&', '*', '_', '=', '+', '/', '<', '>', '`', '~');//is backtick ` punctuation
		
		for(i = 0; i < l; i++) {
			c = rtext.charAt(i);
			if(cons.includes(c)){
				numCon++;
			}
			else if(vows.includes(c)){
				numVow++;
			}
			else if(nums.includes(c)){
				numNum++;
			}
			else if(c == ' '){
				numSpa++;
			}
			else if(puns.includes(c)){
				numPun++;
			}
			else if(spes.includes(c)){
				numSch++;
			}
			else { //probably special character I missed, so throw it there, lol
				numSch++;
			}
		}
				
		//let rob = {
		return {
			consonants: numCon,
			vowels: numVow,
			numbers: numNum,
			spaces: numSpa,
			punctuation: numPun,
			specialCharacters: numSch
		}
		//return rob;
	}
}

const questionFour = function questionFour(num1, num2,num3) {
	numM = num3 * 12;
	numI = num2 / 100;
	numI = numI / 12;
	inal = (num1 / (1-(1/Math.pow((1+numI),(numM))))) * numI;
	f = inal.toFixed(2); //This makes it a string, make sure thats okay and shiz
	f = parseFloat(f, 10);
	return f;
}

module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};