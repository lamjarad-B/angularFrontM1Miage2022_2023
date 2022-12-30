import { Component, Input, OnInit } from "@angular/core";
import { Assignment } from "../../models/assignment.model";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { CoursesService } from "src/app/shared/courses.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";

@Component( {
	selector: "app-assignment-detail",
	templateUrl: "./assignment-detail.component.html",
	styleUrls: [ "./assignment-detail.component.css" ]
} )

export class AssignmentDetailComponent implements OnInit
{
	// Devoir actuellement sélectionné.
	@Input() assignmentTransmis?: Assignment;

	// État de connexion.
	isLogged = this.authService.isLogged;
	isAdmin = this.authService.isAdmin;

	// Propriétés du composant.
	courseName = "";
	teacherName = "";
	teacherAvatar = "";

	// Constructeur.
	constructor(
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService,
		private authService: AuthService,
		private router: Router
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
	{
		// Si l'utilisateur n'est pas connecté ou qu'il n'y a pas de devoir sélectionné, on ne fait rien.
		if ( !this.assignmentTransmis ) return;

		// On récupère le nom du cours et le nom du professeur.
		this.coursesService.getCourse( this.assignmentTransmis.course as number )
			.subscribe( course =>
			{
				this.courseName = course.nom;
				this.teacherName = course.teacherName;
				this.teacherAvatar = course.teacherAvatar;
			} );
	}

	// Méthode pour rendre un devoir.
	onAssignmentRendu()
	{
		// Si l'utilisateur n'est pas connecté ou qu'il n'y a pas de devoir sélectionné, on ne fait rien.
		if ( !this.assignmentTransmis || !this.assignmentTransmis.note || !this.authService.isLogged ) return;

		// On met à jour le devoir pour le rendre.
		this.assignmentTransmis.rendu = true;

		// On met à jour le devoir dans la base de données.
		this.assignmentsService.updateAssignment( this.assignmentTransmis )
			.subscribe( () =>
			{
				this.router.navigate( [ "/home" ] );
			} );
	}

	// Méthode pour supprimer un devoir.
	onDelete()
	{
		// Si l'utilisateur n'est pas connecté ou qu'il n'y a pas de devoir sélectionné, on ne fait rien.
		if ( !this.assignmentTransmis || !this.authService.isAdmin ) return;

		// On supprime le devoir dans la base de données.
		this.assignmentsService.deleteAssignment( this.assignmentTransmis )
			.subscribe( () =>
			{
				this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
					this.router.navigate( [ "/home" ] )
				);
			} );

		// On supprime le devoir actuellement sélectionné.
		this.assignmentTransmis = undefined;
	}

	// Méthode pour éditer un devoir.
	onClickEdit()
	{
		// Si l'utilisateur n'est pas connecté ou qu'il n'y a pas de devoir sélectionné, on ne fait rien.
		if ( !this.assignmentTransmis || !this.authService.isAdmin ) return;

		// On redirige vers la page d'édition du devoir.
		this.router.navigate( [ "/assignment", this.assignmentTransmis.id, "edit" ], {
			queryParams: {
				nom: this.assignmentTransmis.nom
			}, fragment: "edition"
		} );
	}
}