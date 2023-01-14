import { NgModule } from "@angular/core";// L'application de base
import { BrowserModule } from "@angular/platform-browser";// Permet d'afficher l'application dans un navigateur
import { MAT_DATE_LOCALE } from "@angular/material/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";// On récupère le module Button
import { MatIconModule } from "@angular/material/icon";// On récupère le module Icon
import { MatDividerModule } from "@angular/material/divider";// On récupère le module divider
import { MatInputModule } from "@angular/material/input";// On récupère le module input
import { MatFormFieldModule } from "@angular/material/form-field";// On récupère le module form-field
import { MatDatepickerModule } from "@angular/material/datepicker";// On récupère le module datepicker
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatStepperModule } from "@angular/material/stepper";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { RenduDirective } from "./shared/rendu.directive"; // Correspond au module qu'on a créé
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";

import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddAssignmentComponent } from "./assignments/add-assignment/add-assignment.component";
import { AuthGuard } from "./shared/auth.guard";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { EditAssignmentComponent } from "./assignments/edit-assignment/edit-assignment.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
	//home page, ce qui sera affiché avec http://localhost:4200/
	//ou http://localhost:4200/
	{ path: "", component: AssignmentsComponent },
	//ou http://localhost:4200/home
	{ path: "home", component: AssignmentsComponent },
	{ path: "add", component: AddAssignmentComponent },
	{ path: "assignment/:id", component: AddAssignmentComponent },
	{ path: "assignment/:id/edit", component: EditAssignmentComponent, canActivate: [ AuthGuard ] },
];

@NgModule( {
	declarations: [
		//Tous les composants dans src/app peuvent utiliser ces modules
		AppComponent,
		AssignmentsComponent,
		RenduDirective,
		AssignmentDetailComponent,
		AddAssignmentComponent,
		EditAssignmentComponent,
  FooterComponent
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
		ReactiveFormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
		MatPaginatorModule,
		MatTableModule,
		MatSortModule,
		MatStepperModule,

		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule, // des cartes de presentation
		MatCheckboxModule,
		MatSlideToggleModule,

		RouterModule.forRoot( routes ),

		HttpClientModule,
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
	],
	bootstrap: [ AppComponent ]
} )

export class AppModule { }