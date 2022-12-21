import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";
import { AssignmentsService } from "../shared/assignments.service";
import { Assignment } from "../models/assignment.model";

@Component( {
	selector: "app-assignments",
	templateUrl: "./assignments.component.html",
	styleUrls: [ "./assignments.component.css" ]
} )

export class AssignmentsComponent implements OnInit
{
	// Propriétés du composant.
	titre = "Mon application sur les Assignments !";
	ajoutActive = false;

	// Propriétés du formulaire
	nomDevoir = "";
	remarque = "";
	note = 0;
	rendu = false;
	course = 0;
	dateRendu!: Date;

	// Devoir sélectionné par l'utilisateur.
	assignmentSelectionne!: Assignment | undefined;

	// Affichage ou non du formulaire d'ajout d'un devoir.
	formVisible = false;

	// Pour la pagination des résultats.
	page: number = 1;
	limit: number = 10;
	totalDocs!: number;
	totalPages!: number;
	hasPrevPage!: boolean;
	prevPage!: number;
	hasNextPage!: boolean;
	nextPage!: number;
	assignments!: Assignment[];

	// État de connexion
	isLogged = this.authService.isLogged;

	// L'utilisateur est-il un administrateur ?
	isAdmin = this.authService.isAdmin;

	// Constructeur.
	constructor(
		private authService: AuthService,
		private assignmentsService: AssignmentsService
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
	{
		// On récupère les devoirs (avec pagination).
		this.assignmentsService.getAssignmentsPagine( this.page, this.limit )
			.subscribe( data =>
			{
				this.assignments = data.docs;
				this.page = data.page;
				this.limit = data.limit;
				this.totalDocs = data.totalDocs;
				this.totalPages = data.totalPages;
				this.hasPrevPage = data.hasPrevPage;
				this.prevPage = data.prevPage;
				this.hasNextPage = data.hasNextPage;
				this.nextPage = data.nextPage;

				console.log( "données reçues" );
			} );
	}

	// Méthode pour récupérer les devoirs.
	getAssignment()
	{
		this.assignmentsService.getAssignments()
			.subscribe( assignments => this.assignments = assignments );
	}

	// Méthode pour sélectionner un devoir.
	assignmentClique( assignment: Assignment )
	{
		if ( this.assignmentSelectionne === assignment )
		{
			// Si le devoir est déjà sélectionné, on cache alors ses détails.
			this.assignmentSelectionne = undefined;
		}
		else
		{
			// Dans le cas contraire, on met à jour les détails du devoir.
			this.assignmentSelectionne = assignment;
		}
	}

	// Méthode pour voir les détails d'un devoir.
	onAddAssignmentBtnClick()
	{
		this.formVisible = true;
	}

	// Méthode pour cacher les détails d'un devoir.
	onNouvelAssignment()
	{
		this.formVisible = false;
	}
}