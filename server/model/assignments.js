const mongoose = require( "mongoose" );
const aggregatePaginate = require( "mongoose-aggregate-paginate-v2" );

const Schema = mongoose.Schema;
const AssignmentSchema = Schema( {
	id: Number,
	dateDeRendu: Date,
	nom: String,
	rendu: Boolean
} );

AssignmentSchema.plugin( aggregatePaginate );

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model( "Assignment", AssignmentSchema );