const bcrypt = require("bcryptjs")
const saltRounds = 10

let UserSchema = require("../model/users");

function checkCredentials(request, result)
{
	// Récupération des données de l'utilisateur.
	const email = request.body.email;
	const password = request.body.password;

	if (!email || !password)
	{
		// Données manquantes/invalides.
		result
			.status(400)
			.send("Mauvaise requête");
	} else {
		// Recherche de l'utilisateur dans la base de données.
		UserSchema.findOne({
			email: email
		}, (err, user) => {
			if (err) {
				// Erreur interne de la base de données.
				console.log(err);
				result
					.status(500)
					.send(err.message)
			} else if (user) {
				// Comparaison du mot de passe (hash).
				// Source : https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
				bcrypt.compare(password, user.password, function(error, isMatch) {
					if (error) {
						throw error
					} else if (!isMatch) {
						// Mot de passe incorrect.
						result
							.status(401)
							.send("Mot de passe incorrect");
					} else {
						// Utilisateur trouvé.
						result
							.status(200)
							.json({found: true, admin: user.admin})
					}
				})
			} else {
				// Utilisateur introuvable.
				result
					.status(404)
					.send("Utilisateur introuvable");
			}
		});
	}
}

module.exports = { checkCredentials };