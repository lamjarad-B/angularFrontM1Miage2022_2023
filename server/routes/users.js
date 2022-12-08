const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcryptjs" );
const config = require( "../config" );
const UserSchema = require( "../model/users" );

function checkJWT( request, result )
{
	// Récupération du jeton d'authentification dans les cookies du navigateur.
	// Source : https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
	const token = request.cookies[ "access-token" ];

	if ( !token )
	{
		// Jeton introuvable.
		return result.status( 401 ).send( { auth: false, message: "Jeton d'authentification introuvable." } );
	}

	// Vérification du jeton.
	jwt.verify( token, config.secret, function ( tokenError, tokenDecoded )
	{
		if ( tokenError )
		{
			// Erreur interne lors de la vérification du jeton.
			return result.status( 500 ).send( { auth: false, message: "Impossible d'authentifier par le jeton." } );
		}

		UserSchema.findOne( { token: tokenDecoded }, function ( dbError, dbData )
		{
			if ( dbError )
			{
				// Erreur interne de la base de données.
				console.log( err );
				return result.status( 500 ).send( { auth: false, message: "Erreur de la base de données." } );
			}
			else if ( dbData )
			{
				// Résultat trouvé grâce à l'adresse email.
				return result.status( 200 ).send( { auth: true, token: tokenDecoded, admin: dbData.admin } );
			}

			// Utilisateur introuvable.
			return result.status( 404 ).send( { auth: false, message: "Utilisateur introuvable." } );
		} );
	} );
}

function checkCredentials( request, result )
{
	// Récupération des données de l'utilisateur.
	const email = request.body.email;
	const password = request.body.password;

	if ( !email || !password )
	{
		// Données manquantes/invalides.
		return result.status( 400 ).send( { auth: false, message: "Données manquantes ou invalides." } );
	}

	// Recherche de l'utilisateur dans la base de données.
	UserSchema.findOne( { email: email }, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			// Erreur interne de la base de données.
			console.log( err );
			return result.status( 500 ).send( { auth: false, message: "Erreur de la base de données." } );
		}
		else if ( dbData )
		{
			// Comparaison du mot de passe (hash).
			// Source : https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
			bcrypt.compare( password, dbData.password, function ( cryptError, cryptMatch )
			{
				if ( cryptError )
				{
					return result.status( 500 ).send( { auth: false, message: "Erreur de chiffrement." } );
				}
				else if ( !cryptMatch )
				{
					// Mot de passe incorrect.
					return result.status( 401 ).send( { auth: false, message: "Mot de passe incorrect." } );
				}
				else
				{
					// Utilisateur trouvé.
					let token = request.cookies[ "access-token" ];

					if ( !token )
					{
						// Génération d'un jeton d'authentification pour se connecter automatiquement la prochaine fois.
						token = jwt.sign( { id: dbData._id }, config.secret, {
							expiresIn: 86400 // Expiration au bout de 24 heures.
						} );

						// Définition du jeton sous forme de cookie.
						result.cookie( "access-token", token, { maxAge: 86400 * 1000, httpOnly: true, secure: true } );

						// Mise à jour du jeton dans la base de données.
						UserSchema.findByIdAndUpdate( dbData._id, { token: token }, ( dbError, _dbData ) =>
						{
							if ( dbError )
							{
								console.log( err );
								return result.status( 500 ).send( { auth: false, message: "Erreur de la base de données." } );
							}

							return result.status( 200 ).send( { auth: true, admin: dbData.admin } );
						} );
					}
					else
					{
						return result.status( 200 ).send( { auth: true, admin: dbData.admin } );
					}
				}
			} );
		}
		else
		{
			// Utilisateur introuvable.
			return result.status( 404 ).send( { auth: false, message: "Utilisateur introuvable." } );
		}
	} );
}

module.exports = { checkJWT, checkCredentials };