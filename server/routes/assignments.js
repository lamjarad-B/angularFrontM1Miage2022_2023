const Assignment = require( "../model/assignments" );

// Récupérer tous les assignments (GET).
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

// Récupérer un assignment par son id (GET)
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

// Ajout d'un assignment (POST)
function postAssignment( request, result )
{
	const assignment = new Assignment();
	assignment.id = request.body.id;
	assignment.nom = request.body.nom;
	assignment.dateDeRendu = request.body.dateDeRendu;
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

// Update d'un assignment (PUT)
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

// suppresultsion d'un assignment (DELETE)
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

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };