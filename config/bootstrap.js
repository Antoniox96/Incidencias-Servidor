var fixtures = require('sails-fixtures');
 
module.exports.bootstrap = function(next) {

	fixtures.init({

		'dir': 		require('path').resolve(__dirname, '../data'),
		'pattern': 	'*.json'

	}, next);

};