var	jwt = require('jsonwebtoken'),
	tokenSecret = "IntercontinentalSecretToken";

// Genera un token a partir de un payload.
module.exports.issue = function(payload) {
	return jwt.sign(payload, tokenSecret, { expiresIn : '1h' });
};

// Verifica el token de una petición.
module.exports.verify = function(token, callback) {
	return jwt.verify(
		token,
		tokenSecret,
		{},
		callback
	);
};

// Decofidica el token.
module.exports.decode = function(token, callback) {
	return jwt.decode(
		token,
		callback
	);
};