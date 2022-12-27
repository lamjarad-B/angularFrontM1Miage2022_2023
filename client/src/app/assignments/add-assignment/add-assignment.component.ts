import { Component, OnInit } from "@angular/core";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { CoursesService } from "src/app/shared/courses.service";
import { Assignment } from "../../models/assignment.model";
import { Course } from "../../models/course.model";

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
	teacher: string = "Inconnu";
	image!: string;
	courses: Course[] = [];

	// Constructeur.
	constructor( private assignmentsService: AssignmentsService, private coursesService: CoursesService ) { }

	// Méthode d'initialisation.
	ngOnInit()
	{
		// Récupération de toutes les matières (avec pagination).
		this.coursesService.getCourses( 1, 10 )
			.subscribe( data =>
			{
				this.courses = data.docs;
			} );
	}

	// Méthode pour récupérer les informations d'une matière.
	onChange( id: number )
	{
		this.coursesService.getCourse( id )
			.subscribe( data =>
			{
				this.teacher = data.teacherName;
				this.image = data.image;
			} );
	}

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