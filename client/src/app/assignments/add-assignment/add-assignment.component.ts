import { Component, OnInit } from "@angular/core";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { Assignment } from "../../models/assignment.model";

@Component( {
	selector: "app-add-assignment",
	templateUrl: "./add-assignment.component.html",
	styleUrls: [ "./add-assignment.component.css" ]
} )

export class AddAssignmentComponent implements OnInit
{
	// Propriétés du composant.
	nomDevoir!: string;
	dateRendu!: Date;

	// Constructeur.
	constructor( private assignmentsService: AssignmentsService ) { }

	// Méthode d'initialisation.
	ngOnInit(): void { }

	// Méthode pour ajouter un devoir.
	onSubmit()
	{
		const newAssignment = new Assignment();
		newAssignment.id = Math.floor( Math.random() * 10000 );
		newAssignment.nom = this.nomDevoir;
		newAssignment.dateDeRendu = this.dateRendu;
		newAssignment.rendu = false;

		this.assignmentsService.addAssignment( newAssignment ).subscribe( () => { } );
	}
}