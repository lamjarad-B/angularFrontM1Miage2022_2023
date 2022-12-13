// Modèle MongoDB pour les utilisateurs.
const mongoose = require( "mongoose" );
const aggregatePaginate = require( "mongoose-aggregate-paginate-v2" );

const Schema = mongoose.Schema;
const UserSchema = Schema( {
	email: String,
	password: String,
	admin: Boolean,
	token: String
}, {
	timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
} );

UserSchema.plugin( aggregatePaginate );

module.exports = mongoose.model( "User", UserSchema );