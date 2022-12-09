import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable( {
	providedIn: "root"
} )

export class AuthService
{
	private HttpOptions = {
		headers: new HttpHeaders( {
			"Content-Type": "application/json"
		} )
	};

	// État de connexion de l'utilisateur.
	loggedIn = false;

	// L'utilisateur est-il un administrateur ?
	admin = false;

	// Durée de validité d'un jeton d'authentification (1 jour).
	jwtDuration = 86400 * 1000;

	// Constructeur de la classe.
	constructor( private http: HttpClient ) { }

	// Fonction d'authentification.
	logIn( email: any, password: string )
	{
		// On active une nouvelle promesse afin de réaliser une requête HTTP à la base de données.
		return new Promise( ( resolve, _reject ) =>
		{
			this.http.post<any>( "http://localhost:8010/api/auth/login", { email: email, password: password }, this.HttpOptions )
				.subscribe( data =>
				{
					console.log( data );

					// Lors de la réponse du serveur, on vérifie si la connexion a réussi.
					if ( data.auth === true )
					{
						// Si la connexion a réussie, on stocke le jeton d'authentification et sa date d'expiration.
						localStorage.setItem( "id_token", data.token );
						localStorage.setItem( "expires_at", ( new Date().getTime() + this.jwtDuration ).toString() );

						// Aussi, on définit les attributs de l'utilisateur (connecté, admin ?).
						this.loggedIn = true;
						this.admin = data.admin;
					}

					// Résolution de la promesse.
					resolve( data );
				},
					err =>
					{
						resolve( err );
					} );
		} );
	}

	// Fonction de déconnexion.
	logOut()
	{
		this.loggedIn = false;
		this.admin = false;
	}

	// Détermine grâce à une promesse si l'utilisateur est connecté.
	isAdmin()
	{
		const isUserAdmin = new Promise( ( resolve, _reject ) =>
		{
			resolve( this.loggedIn && this.admin );
		} );

		return isUserAdmin;
	}
}