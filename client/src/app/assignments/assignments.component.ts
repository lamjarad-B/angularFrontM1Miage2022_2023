import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
	selector: 'app-assignments',
	templateUrl: './assignments.component.html',
	styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit {

	titre = "Mon application sur les Assignments !"
	ajoutActive = false; // pour le button dans le fichier html

	//Proprietes du formulaire
	nomDevoir=""; // Pour récupérer la valeur du champs nom

	dateRendu!: Date; // Pour récupérer la valeur du champs dateDeRendu

	// Devoir sélectionné par l'utilisateur.
	assignmentSelectionne!: Assignment;

	// Affichage ou non du formulaire d'ajout d'un devoir.
	formVisible = false;

	// Pour la pagination
	page: number=1;
	limit: number=10;
	totalDocs!: number;
	totalPages!: number;
	hasPrevPage!: boolean;
	prevPage!: number;
	hasNextPage!: boolean;
	nextPage!: number;

	assignments!: Assignment[];

	// Récupère l'état de la connexion.
	isLogged = this.authService.loggedIn;

	constructor(private authService:AuthService, private assignmentService: AssignmentsService) { } //Ingection des services

	ngOnInit(): void {
		//this.assignments = this.assignmentsServices.getAssignments();// utilisation des services
		//this.getAssignment();
		this.assignmentService.getAssignmentsPagine(this.page, this.limit)
			.subscribe(data => {
				this.assignments = data.docs;
				this.page = data.page;
				this.limit = data.limit;
				this.totalDocs = data.totalDocs;
				this.totalPages = data.totalPages;
				this.hasPrevPage = data.hasPrevPage;
				this.prevPage = data.prevPage;
				this.hasNextPage = data.hasNextPage;
				this.nextPage = data.nextPage;

				console.log("données reçues");
			});
	}

	getAssignment(){ // Renvoie un Observable
		this.assignmentService.getAssignments()
			.subscribe(assignments => this.assignments = assignments);
	}

	assignmentClique(assignment: Assignment) {
		this.assignmentSelectionne = assignment;
	}

	onAddAssignmentBtnClick() {
		this.formVisible = true;
	}

	onNouvelAssignment() {
		this.formVisible = false;
	}
}