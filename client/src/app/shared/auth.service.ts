import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})

export class AuthService {
	private HttpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	};

	// État de connexion de l'utilisateur.
	loggedIn = false;

	// L'utilisateur est-il un administrateur ?
	admin = false;

	// URL vers l'API d'authentification.
	url = "http://localhost:8010/api/login";

	constructor(private http: HttpClient) { }

	logIn(email: any, password: string) {
		// On active une nouvelle promesse afin de réaliser une requête HTTP à la base de données.
		return new Promise((resolve, reject) => {
			this.http.post<any>(this.url, { email: email, password: password }, this.HttpOptions)
				.subscribe(data => {
					console.log(data);

					// Lors de la réponse du serveur, on vérifie si la connexion a réussi.
					if (data.found === true) {
						// Dans ce cas, on définit les attributs de l'utilisateur (connecté, admin ?).
						this.loggedIn = true;
						this.admin = data.admin;
					}

					// Résolution de la promesse.
					resolve(data);
				},
				err => {
					resolve(err);
				});
		});
	}

	logOut() {
		this.loggedIn = false;
		this.admin = false;
	}

	// renvoie une promesse qui est résolue si l'utilisateur est loggué
	isAdmin() {
		const isUserAdmin = new Promise((resolve, reject) => {
			resolve(this.loggedIn && this.admin);
		});
		return isUserAdmin;
	}
}