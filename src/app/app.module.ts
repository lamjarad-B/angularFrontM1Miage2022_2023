import { NgModule } from '@angular/core';// L'application de base
import { BrowserModule } from '@angular/platform-browser';// Permet d'afficher l'application dans un navigateur

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';// On récupère le module Button
import { MatIconModule } from '@angular/material/icon';// On récupère le module Icon
import { MatDividerModule } from '@angular/material/divider';// On récupère le module divider
import { MatInputModule } from '@angular/material/input';// On récupère le module input
import { MatFormFieldModule } from '@angular/material/form-field';// On récupère le module form-field
import { MatDatepickerModule } from '@angular/material/datepicker';// On récupère le module datepicker
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive'; // Correspond au module qu'on a créer
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
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
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
