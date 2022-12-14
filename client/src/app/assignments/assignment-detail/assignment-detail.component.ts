import { Component, Input, OnInit } from "@angular/core";
import { Assignment } from "../../models/assignment.model";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";

@Component( {
	selector: "app-assignment-detail",
	templateUrl: "./assignment-detail.component.html",
	styleUrls: [ "./assignment-detail.component.css" ]
} )

export class AssignmentDetailComponent implements OnInit
{
	@Input() assignmentTransmis?: Assignment;

	isLogged = this.authService.isLogged;
	isAdmin = this.authService.isAdmin;

	constructor( private assignmentsService: AssignmentsService, private authService: AuthService, private router: Router ) { }

	ngOnInit(): void { }

	onAssignmentRendu()
	{
		if ( !this.assignmentTransmis || !this.assignmentTransmis.note || !this.authService.isLogged ) return;

		this.assignmentTransmis.rendu = true;

		this.assignmentsService.updateAssignment( this.assignmentTransmis )
			.subscribe( message =>
			{
				console.log( message );
				this.router.navigate( [ "/home" ] );
			} );
	}

	onDelete()
	{
		if ( !this.assignmentTransmis || !this.authService.isAdmin ) return;

		this.assignmentsService.deleteAssignment( this.assignmentTransmis )
			.subscribe( ( message ) =>
			{
				console.log( message );
				this.router.navigateByUrl( "/", { skipLocationChange: true } ).then( () =>
					this.router.navigate( [ "/home" ] )
				);
			} );

		// Il faut mettre l’assignmentTransmis à null pour que la carte n’affiche plus le détail !
		this.assignmentTransmis = undefined;
	}

	onClickEdit()
	{
		if ( !this.assignmentTransmis || !this.authService.isAdmin ) return;

		this.router.navigate( [ "/assignment", this.assignmentTransmis.id, "edit" ], {
			queryParams: {
				nom: this.assignmentTransmis.nom
			}, fragment: "edition"
		} );
	}
}