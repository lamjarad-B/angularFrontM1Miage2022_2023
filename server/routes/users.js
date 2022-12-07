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
		// Génération du hash du mot de passe.
		// Source : https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
		bcrypt.genSalt(saltRounds, function (saltError, salt) {
			if (saltError) {
				throw saltError
			} else {
				bcrypt.hash(password, salt, function(hashError, hash) {
					if (hashError) {
						throw hashError
					} else {
						// Recherche de l'utilisateur dans la base de données.
						UserSchema.findOne({
							email: email,
							password: hash
						}, (err, user) => {
							if (err) {
								// Erreur interne de la base de données.
								console.log(err);
								result
									.status(500)
									.send("Erreur interne du serveur");
							} else if (user) {
								// Utilisateur trouvé.
								result
									.status(200)
									.send("Utilisateur trouvé");
							} else {
								// Utilisateur introuvable.
								result
									.status(404)
									.send("Utilisateur introuvable");
							}
						});

					}
				})
			}
		})
	}
}

module.exports = { checkCredentials };