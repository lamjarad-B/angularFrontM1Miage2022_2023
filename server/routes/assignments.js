const Assignment = require( "../model/assignments" );

// Récupération de tous les devoirs (requête de type GET).
function getAssignments( request, result )
{
	const query = Assignment.aggregate();

	Assignment.aggregatePaginate( query, {
		page: parseInt( request.query.page ) || 1,
		limit: parseInt( request.query.limit ) || 10,
	}, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.send( dbData );
	} );
}

// Récupérer d'un devoir à partir de son identifiant unique (requête de type GET).
function getAssignment( request, result )
{
	Assignment.findOne( { id: request.params.id }, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.json( dbData );
	} );
}

// Ajout d'un nouveau devoir (requête de type POST).
function addAssignment( request, result )
{
	const assignment = new Assignment();
	assignment.id = request.body.id;
	assignment.nom = request.body.nom;
	assignment.auteur = request.body.auteur;
	assignment.courseId = request.body.courseId;
	assignment.dateDeRendu = request.body.dateDeRendu;
	assignment.remarque = request.body.remarque;
	assignment.note = request.body.note;
	assignment.rendu = request.body.rendu;

	console.log( "POST assignment reçu :" );
	console.log( assignment );

	assignment.save( ( dbError ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.json( { message: `${ assignment.nom } saved!` } );
	} );
}

// Mise à jour d'un devoir existant (requête de type PUT).
function updateAssignment( request, result )
{
	console.log( "UPDATE recu assignment : " );
	console.log( request.body );

	Assignment.findByIdAndUpdate( request.body._id, request.body, { new: true }, ( dbError, _dbData ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.json( { message: "updated" } );
	} );
}

// Suppression d'un devoir existant (requête de type DELETE).
function deleteAssignment( request, result )
{
	console.log( "UPDATE recu assignment : " );
	console.log( request.body );

	Assignment.findByIdAndRemove( request.params.id, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.json( { message: `${ dbData.nom } deleted` } );
	} );
}

module.exports = { getAssignments, addAssignment, getAssignment, updateAssignment, deleteAssignment };