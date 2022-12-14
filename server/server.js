// Dépendances et configuration du serveur.
const express = require( "express" );
const app = express();
const cors = require( "cors" );
const bodyParser = require( "body-parser" );

// Liaison à la base de données MongoDB.
const mongoose = require( "mongoose" );
mongoose.Promise = global.Promise;
// mongoose.set( "debug", true );

const uri = "mongodb+srv://Brahim1990:brahim1990@cluster0.uz0zutp.mongodb.net/assignments?retryWrites=true&w=majority";
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
};

mongoose.connect( uri, options )
	.then( () =>
	{
		console.log( "Connecté à la base MongoDB assignments dans le cloud !" );
		console.log( "at URI = " + uri );
		console.log( "vérifiez with http://localhost:8010/api/assignments que cela fonctionne" );
	},
		dbError =>
		{
			console.log( "Erreur de connexion: ", dbError );
		} );

// Autorisation des requêtes HTTP ayant des requêtes CORS.
app.use( cors( {
	origin: "http://localhost:4200", // Le serveur accepte uniquement les requêtes du domaine front.
	credentials: true, // La transmission d'informations de connexion est autorisée.
	allowedHeaders: [ "Content-Type", "Authorization" ] // La transmission de certains types d'en-têtes est autorisée.
} ) );

// Modification du traitement des données reçues par le serveur.
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// Ouverture des routes de réponse.
const users = require( "./routes/users" );
const courses = require( "./routes/courses" );
const assignments = require( "./routes/assignments" );
const prefix = "/api";

app.route( prefix + "/assignments" ) // Route pour obtenir et modifier les informations de l'ensemble des devoirs.
	.get( assignments.getAssignments )
	.post( assignments.addAssignment )
	.put( assignments.updateAssignment )
	.delete( assignments.deleteAssignment );

app.route( prefix + "/assignments/:id" ) // Route pour obtenir et modifier les informations d'un devoir.
	.get( assignments.getAssignment )
	.delete( assignments.deleteAssignment );

app.route( prefix + "/courses" ) // Route pour obtenir et modifier les informations de l'ensemble des matières.
	.get( courses.getCourses )
	.post( courses.addCourse );

app.route( prefix + "/courses/:id" ).get( courses.getCourse ); // Route pour obtenir les informations d'une matière.

app.route( prefix + "/auth/token" ) // Route pour la connexion automatique via le JWT.
	.post( users.checkJWT );

app.route( prefix + "/auth/login" ) // Route pour la connexion manuelle via les identifiants.
	.post( users.checkCredentials );

// Démarrage du serveur au port spécifié.
const port = process.env.PORT || 8010;

app.listen( port, "0.0.0.0" );
console.log( "Serveur démarré sur http://localhost:" + port );

module.exports = app;