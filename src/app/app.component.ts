import { Component } from '@angular/core';

@Component({
  //Des propriétés
  selector: 'app-root', //Le nom du component(il se trouve dans l'index)
  templateUrl: './app.component.html',// template qui correspond à l'affichage de ce composant
  styleUrls: ['./app.component.css']// Le style de ce composant
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
}


