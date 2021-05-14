const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");


// Mean Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const meanOne = arrayUtils.mean([1, 2, 3, 4, 5]);  //in his example he dosen't have teh arrayUtils. shit ??????
   console.log('mean passed successfully');
} catch (e) {
   console.error('mean failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.mean("sup bae");
   console.error('mean did not error');
} catch (e) {
   console.log('mean failed successfully');
}


// MedianSquared Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const med1 = arrayUtils.medianSquared([1, 2, 2, 3, 5, 6, 9]);
   console.log('medianSquared passed successfully');
} catch (e) {
   console.error('medianSquared failed test case');
}
try {
   // Should Fail
   const med2 = arrayUtils.medianSquared("how u doin");
   console.error('medianSquared did not error');
} catch (e) {
   console.log('medianSquared failed successfully');
}


// MaxElement Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const max1 = arrayUtils.maxElement([1, 5, 2, 9, 3]);
   console.log('maxElement passed successfully');
} catch (e) {
   console.error('maxElement failed test case');
}
try {
   // Should Fail
   const max2 = arrayUtils.maxElement(1337);
   console.error('maxElement did not error');
} catch (e) {
   console.log('maxElement failed successfully');
}


// Fill Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const fil1 = arrayUtils.fill(9, "yeet");
   console.log('fill passed successfully');
} catch (e) {
   console.error('fill failed test case');
}
try {
   // Should Fail
   const fil2 = arrayUtils.fill("GME to the MOOOOOOON");
   console.error('fill did not error');
} catch (e) {
   console.log('fill failed successfully');
}


// CountRepeating Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

try {
   // Should Pass
   const meanOne = arrayUtils.countRepeating(["UwU", "OwO", ":)", ":)", 5, 3, 1, 8, 0, 0, 8]);
   console.log('countRepeating passed successfully');
} catch (e) {
   console.error('countRepeating failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.countRepeating(5318008);
   console.error('countRepeating did not error');
} catch (e) {
   console.log('countRepeating failed successfully');
}


// IsEqual Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const meanOne = arrayUtils.isEqual([1, 3, 3, 7],[7, 3, 1, 3]);
   console.log('isEqual passed successfully');
} catch (e) {
   console.error('isEqual failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.isEqual("YOOOO, did this ez", "if you ignore the hour I spend not relizing I never returned");
   console.error('isEqual did not error');
} catch (e) {
   console.log('isEqual failed successfully');
}


// CamelCase Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const cam1 = stringUtils.camelCase("Yo I was gonna look up a pun for this or some shit, but like nah");
   console.log('camelCase passed successfully');
} catch (e) {
   console.error('camelCase failed test case');
}
try {
   // Should Fail
   const cam2 = stringUtils.camelCase(["did you get the pun", "masterwork right??"]);
   console.error('camelCase did not error');
} catch (e) {
   console.log('camelCase failed successfully');
}


// ReplaceChar Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const rep1 = stringUtils.replaceChar("did you look for the pun, I told you there wasn't one, lol, also why Daddy???");
   console.log('replaceChar passed successfully');
} catch (e) {
   console.error('replaceChar failed test case');
}
try {
   // Should Fail
   const rep2 = stringUtils.camelCase(5318008);
   console.error('replaceChar did not error');
} catch (e) {
   console.log('replaceChar failed successfully');
}


// MashUp Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const mas1 = stringUtils.mashUp("this was kinda fun", "do the TA's even read these???");
   console.log('mashUp passed successfully');
} catch (e) {
   console.error('mashUp failed test case');
}
try {
   // Should Fail
   const mas2 = stringUtils.mashUp("nah probably not", "           ");
   console.error('mashUp did not error');
} catch (e) {
   console.log('mashUp failed successfully');
}


// makeArrays Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const mak1 = objUtils.makeArrays([{a: 5, b: 2, c: 10}, {x: 2, y: 9, z: 2}]);
   console.log('makeArrays passed successfully');
} catch (e) {
   console.error('makeArrays failed test case');
}
try {
   // Should Fail
   const mak2 = objUtils.makeArrays([{a: 5, b: 2, c: 10}, "I'm an object!!!!", "shut up paul, you're a string"]);
   console.error('makeArrays did not error');
} catch (e) {
   console.log('makeArrays failed successfully');
}

// isDeepEqual Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const meanOne = objUtils.isDeepEqual({a: {sA: "Whats", sB: "Poppin", sC: "B"}, b: 7, c: true, d: "YEEE"}, {c: false, b: 7, d: "W", a: {sB: "P", sC: "B"}});
   console.log('isDeepEqual passed successfully');
} catch (e) {
   console.error('isDeepEqual failed test case');
}
try {
   // Should Fail
   const meanTwo = objUtils.isDeepEqual("I'll be honest, this one was a bitch, so I don't wanna do no jokes");
   console.error('isDeepEqual did not error');
} catch (e) {
   console.log('isDeepEqual failed successfully');
}


// computeObject Tests !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
try {
   // Should Pass
   const com1 = objUtils.computeObject({a: 2, y: 5, z: 9}, n => n * n);
   console.log('computeObject passed successfully');
} catch (e) {
   console.error('computeObject failed test case');
}
try {
   // Should Fail
   const com2 = objUtils.computeObject("I understand why it is important, but man do I hate error checking", n => n * n);
   console.error('computeObject did not error');
} catch (e) {
   console.log('computeObject failed successfully');
}


