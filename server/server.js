const express = require( "express" );
const app = express();
const bodyParser = require( "body-parser" );

const users = require( "./routes/users" );
const assignments = require( "./routes/assignments" );

const mongoose = require( "mongoose" );
mongoose.Promise = global.Promise;
// mongoose.set( "debug", true );

// remplacer toute cette chaîne par l'URI de connexion à votre propre base dans le cloud.
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

// Pour accepter les connexions cross-domain (CORS)
app.use( function ( _request, result, next )
{
	result.header( "Access-Control-Allow-Origin", "*" );
	result.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
	result.header( "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS" );

	next();
} );

// Pour les formulaires
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

const port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

app.route( prefix + "/assignments" )
	.get( assignments.getAssignments );

app.route( prefix + "/assignments/:id" )
	.get( assignments.getAssignment )
	.delete( assignments.deleteAssignment );

app.route( prefix + "/assignments" )
	.post( assignments.postAssignment )
	.put( assignments.updateAssignment );

app.route( prefix + "/auth/token" )
	.post( users.checkJWT );

app.route( prefix + "/auth/login" )
	.post( users.checkCredentials );

// On démarre le serveur
app.listen( port, "0.0.0.0" );
console.log( "Serveur démarré sur http://localhost:" + port );

module.exports = app;