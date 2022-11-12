import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  //Des propriétés
  selector: 'app-root', //Le nom du component(il se trouve dans l'index)
  templateUrl: './app.component.html',// template qui correspond à l'affichage de ce composant
  styleUrls: ['./app.component.css']// Le style de ce composant
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';

  constructor( private router:Router, private assignmentService: AssignmentsService){

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
