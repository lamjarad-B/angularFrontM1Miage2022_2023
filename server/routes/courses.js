const Course = require( "../model/courses" );

// Récupération de toutes les matières (requpete de type GET).
function getCourses( request, result )
{
	const query = Course.aggregate();

	Course.aggregatePaginate( query, {
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

// Récupérer d'une matière à partir de son identifiant unique (requête de type GET).
function getCourse( request, result )
{
	Course.findOne( { id: request.params.id }, ( dbError, dbData ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.json( dbData );
	} );
}

// Ajout d'une nouvelle matière (requête de type POST).
function addCourse( request, result )
{
	const course = new Course();
	course.id = request.body.id;
	course.nom = request.body.nom;
	course.teacherName = request.body.teacherName;
	course.teacherAvatar = request.body.teacherAvatar;

	console.log( "POST matière reçu :" );
	console.log( course );

	course.save( ( dbError ) =>
	{
		if ( dbError )
		{
			console.log( dbError );
			return result.send( dbError );
		}

		return result.json( { message: `${ course.nom } saved!` } );
	} );
}

module.exports = { getCourses, getCourse, addCourse };