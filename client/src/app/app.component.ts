import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./shared/auth.service";
import { AssignmentsService } from "./shared/assignments.service";

@Component( {
	//Des propriétés
	selector: "app-root", //Le nom du component(il se trouve dans l'index)
	templateUrl: "./app.component.html",// template qui correspond à l'affichage de ce composant
	styleUrls: [ "./app.component.css" ]// Le style de ce composant
} )

export class AppComponent
{
	private HttpOptions = {
		headers: new HttpHeaders( {
			"Content-Type": "application/json"
		} )
	};

	// Titre du composant
	title = "Application de gestion des devoirs à rendre (Assignments)";

	// Propriétés de l'email/password
	email = "";
	password = "";
	validator = new FormControl( "", [ Validators.required, Validators.email ] );

	// Bouton pour montrer/cache le mot de passe
	hide = true;

	// État de connexion
	isLogged = false;

	// L'utilisateur est-il un administrateur ?
	isAdmin = false;

	// Afficher ou cacher le formulaire
	loginVisible = false;

	constructor( private http: HttpClient, private authService: AuthService, private router: Router, private assignmentService: AssignmentsService ) { }

	ngOnInit(): void
	{
		// On active une nouvelle promesse afin de réaliser une requête HTTP à la base de données.
		this.http.post<any>( "http://localhost:8010/api/auth/token", null, this.HttpOptions )
			.subscribe( data =>
			{
				console.log( data );

				// Lors de la réponse du serveur, on vérifie si la connexion a réussi.
				if ( data.auth === true )
				{
					// Dans ce cas, on définit les attributs de l'utilisateur (connecté, admin ?).
					//this.loggedIn = true;
					//this.admin = data.admin;
				}
			},
				err =>
				{
					console.log( err );
				} );
	}

	async login()
	{
		// Vérification de la présence d'un email/password
		if ( !this.email || !this.password ) { return; }

		// Appel du service d'authentification
		await this.authService.logIn( this.email, this.password );

		// Vérifie si l'utilisateur a été authentifié.
		if ( this.authService.loggedIn )
		{
			// Le formulaire de connexion est caché.
			this.loginVisible = false;

			// L'utilisateur est connecté.
			this.isLogged = true;

			// Détermine si c'est un administrateur grâce au service d'authentification.
			this.isAdmin = this.authService.admin;

			// Redirection vers la page d'accueil.
			this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
				this.router.navigate( [ "/home" ] )
			);
		}
		else
		{
			alert( "Email ou mot de passe incorrect" );
		}

		// Réinitialisation du formulaire
		this.email = "";
		this.password = "";
	}

	logout()
	{
		// Utilisateur/administrateur déconnecté.
		this.isLogged = false;
		this.isAdmin = false;

		// Déconnexion du service d'authentification.
		this.authService.logOut();

		// Redirection vers la page d'accueil.
		this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
			this.router.navigate( [ "/home" ] )
		);
	}

	showLogin()
	{
		// Formulaire de connexion visible.
		this.loginVisible = true;
	}

	getErrorMessage()
	{
		if ( this.validator?.hasError( "required" ) )
		{
			return "Vous devez entrer une valeur";
		}

		return this.validator?.hasError( "email" ) ? "Ce n'est pas une adresse email valide" : "";
	}

	initialiserLaBaseAvecDonneesDeTest()
	{
		this.assignmentService.peuplerBDAvecForkJoin()
			.subscribe( () =>
			{
				console.log( "LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE" );
				// replaceUrl = true = force le refresh, même si
				// on est déjà sur la page d’accueil
				// Marche plus avec la dernière version d’angular
				//  this.router.navigate(["/home"], {replaceUrl:true});

				this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
					this.router.navigate( [ "/home" ] )
				);
			} );
	}
}