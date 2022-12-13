// Modèle MongoDB pour les matières.
const mongoose = require( "mongoose" );
const aggregatePaginate = require( "mongoose-aggregate-paginate-v2" );

const Schema = mongoose.Schema;
const CourseSchema = Schema( {
	id: Number,
	nom: String,
	teacherName: String,
	teacherAvatar: String
} );

CourseSchema.plugin( aggregatePaginate );

module.exports = mongoose.model( "Course", CourseSchema );