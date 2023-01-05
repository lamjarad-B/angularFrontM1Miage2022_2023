const Assignment = require( "../model/assignments" );

// Récupération de tous les devoirs (requête de type GET).
function getAssignments( request, result )
{
	// Filtre de recherche.
	const filter = {};

	if ( request.query.name !== "undefined" && request.query.name !== undefined && request.query.name !== "" )
	{
		// Recherche par nom.
		filter.nom = { $regex: request.query.name };
	}

	if ( request.query.rendu !== "undefined" && request.query.name !== undefined && request.query.rendu === "true" )
	{
		// Recherche par devoir rendu.
		filter.rendu = true;
	}

	// Requête de recherche avec pagination.
	const query = Assignment.aggregate( [ { $match: filter } ] );

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
	assignment.course = request.body.course;
	assignment.dateDeRendu = request.body.dateDeRendu;
	assignment.remarque = request.body.remarque;
	assignment.note = request.body.note;
	assignment.rendu = request.body.rendu;
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