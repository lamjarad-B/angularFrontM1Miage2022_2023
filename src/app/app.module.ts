import { NgModule } from '@angular/core';// L'application de base
import { BrowserModule } from '@angular/platform-browser';// Permet d'afficher l'application dans un navigateur

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';// On récupère le module Button
import { MatIconModule } from '@angular/material/icon';// On récupère le module Icon
import { MatDividerModule } from '@angular/material/divider';// On récupère le module divider
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive'; // Correspond au module qu'on a créer
@NgModule({
  declarations: [
    //Tous les composants dans src/app peuvent utiliser ces modules
    AppComponent,
    AssignmentsComponent,
    RenduDirective
  ],
  imports: [
    //Pour angular material
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,//on utilise le module button
    MatIconModule,//on utilise le module icon
    MatDividerModule,//on utilise le module divider

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
