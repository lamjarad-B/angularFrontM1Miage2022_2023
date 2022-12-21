import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { Assignment } from "../../models/assignment.model";

@Component( {
	selector: "app-edit-assignment",
	templateUrl: "./edit-assignment.component.html",
	styleUrls: [ "./edit-assignment.component.css" ],
} )

export class EditAssignmentComponent implements OnInit
{
	// Propriétés du composant.
	assignment!: Assignment | undefined;
	nomAssignment!: string;
	dateDeRendu!: Date;
	noteAssignment!: number;

	// Constructeur.
	constructor(
		private assignmentsService: AssignmentsService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
	{
		this.getAssignment();
	}

	// Méthode pour récupérer un devoir.
	getAssignment()
	{
		// Récupération de l'identifiant dans l'URL.
		const id = +this.route.snapshot.params[ "id" ];

		this.assignmentsService.getAssignment( id ).subscribe( ( assignment ) =>
		{
			// Si l'identifiant n'existe pas, on retourne rien.
			if ( !assignment ) return;

			// On stocke le devoir dans la propriété du composant.
			this.assignment = assignment;
			this.nomAssignment = assignment.nom;
			this.noteAssignment = assignment.note;
			this.dateDeRendu = assignment.dateDeRendu;
		} );
	}

	onSaveAssignment()
	{
		// si le devoir n'existe pas, on retourne rien.
		if ( !this.assignment ) return;

		// on récupère les valeurs dans le formulaire.
		this.assignment.nom = this.nomAssignment;
		this.assignment.note = Math.min( Math.max( this.noteAssignment, 0 ), 20 );
		this.assignment.dateDeRendu = this.dateDeRendu;
		this.assignmentsService
			.updateAssignment( this.assignment )
			.subscribe( ( message ) =>
			{
				this.router.navigate( [ "/home" ] );
			} );
	}
}