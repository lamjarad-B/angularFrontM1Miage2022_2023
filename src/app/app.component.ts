import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  //Des propriétés
  selector: 'app-root', //Le nom du component(il se trouve dans l'index)
  templateUrl: './app.component.html',// template qui correspond à l'affichage de ce composant
  styleUrls: ['./app.component.css']// Le style de ce composant
})
export class AppComponent {
  // Titre du composant
  title = 'Application de gestion des devoirs à rendre (Assignments)';

  // Propriétés de l'email/password
  email = new FormControl('', [Validators.required, Validators.email]);
  password = '';

  // Bouton pour montrer/cache le mot de passe
  hide = true;

  // État de connexion
  isLogged = false;

  // L'utilisateur est-il un administrateur ?
  isAdmin = false;

  // Afficher ou cacher le formulaire
  loginVisible = false;

  constructor(private authService:AuthService, private router:Router, private assignmentService: AssignmentsService){}

  login() {
    // Vérification de la présence d'un email/password
    if (!this.email || !this.password) { return; }

    // Appel du service d'authentification
    this.authService.logIn(this.email, this.password);

    if (this.authService.loggedIn) {
      this.loginVisible = false;
      this.isLogged = true;
      this.isAdmin = this.authService.admin;
      this.router.navigate(["/home"]);
    }
    else
    {
      alert("Email ou mot de passe incorrect");
    }

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = '';
  }

  logout() {
    this.isLogged = false;
    this.isAdmin = false;
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  showLogin() {
    this.loginVisible = true;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  initialiserLaBaseAvecDonneesDeTest(){
    this.assignmentService.peuplerBDAvecForkJoin()
    .subscribe(() => {
       console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        // replaceUrl = true = force le refresh, même si
        // on est déjà sur la page d’accueil
        // Marche plus avec la dernière version d’angular
       this.router.navigate(["/home"], {replaceUrl:true});
     })
  }
}