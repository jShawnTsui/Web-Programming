function myFunction() {
	console.log('Module1.');
}

var myString = 'Module1.';

module.exports.myFunction = myFunction;
module.exports.myString = myString;