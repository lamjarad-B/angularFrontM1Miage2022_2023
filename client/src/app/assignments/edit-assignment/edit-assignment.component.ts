import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { CoursesService } from "src/app/shared/courses.service";
import { Assignment } from "../../models/assignment.model";
import { Course } from "../../models/course.model";

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
	teacher: string = "Inconnu";
	image!: string;
	courses: Course[] = [];

	// Constructeur.
	constructor(
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
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

	// Méthode pour sauvegarder les modifications d'un devoir.
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
			.subscribe( () =>
			{
				this.router.navigate( [ "/home" ] );
			} );
	}
}