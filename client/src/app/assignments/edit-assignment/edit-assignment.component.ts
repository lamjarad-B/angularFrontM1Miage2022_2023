import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
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
	noteAssignment!: number;
	teacher: string = "Inconnu";
	image!: string;
	courses: Course[] = [];

	// Propriétés pour le formulaire.
	firstFormGroup = this._formBuilder.group( {
		firstCtrl: [ "", Validators.required ], // Nom du devoir.
	} );

	secondFormGroup = this._formBuilder.group( {
		secondCtrl: [ "", Validators.required ], // Matière du devoir.
	} );

	thirdFormGroup = this._formBuilder.group( {
		thirdCtrl: [ "", Validators.required ], // Date de rendu.
	} );

	fourthFormGroup = this._formBuilder.group( {
		fourthCtrl: [ "", Validators.required ], // Note du devoir.
	} );

	fifthFormGroup = this._formBuilder.group( {
		fifthCtrl: [ "", Validators.required ], // Remarque du devoir.
	} );

	isLinear = true;

	// Fonction de comparaison pour les matières.
	// Celle par défaut semble ne pas fonctionner correctement (?)
	// https://stackoverflow.com/a/48916318 / https://github.com/angular/components/issues/10214#issuecomment-369746958
	compareById( object1: any, object2: any )
	{
		return object1 == object2;
	}

	// Constructeur.
	constructor(
		private _formBuilder: FormBuilder,
		private assignmentsService: AssignmentsService,
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
	{
		// Récupération de l'identifiant dans l'URL.
		this.assignmentsService.getAssignment( +this.route.snapshot.params[ "id" ] ).subscribe( ( assignment ) =>
		{
			// Si l'identifiant n'existe pas, on retourne rien.
			if ( !assignment ) return;

			// On stocke le devoir dans la propriété du composant.
			this.assignment = assignment;
			this.firstFormGroup.setValue( { firstCtrl: assignment.nom } );
			this.secondFormGroup.setValue( { secondCtrl: assignment.course.toString() } );
			this.thirdFormGroup.setValue( { thirdCtrl: assignment.dateDeRendu.toString() } );
			this.fourthFormGroup.setValue( { fourthCtrl: assignment.note.toString() } );
			this.fifthFormGroup.setValue( { fifthCtrl: assignment.remarque } );

			// On récupère les informations de la matière.
			this.onChange( assignment.course as number );
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
		// Si le devoir n'existe pas ou si le formulaire n'est pas valide, on ne fait rien.
		if ( !this.assignment || !this.firstFormGroup.value.firstCtrl || !this.secondFormGroup.value.secondCtrl || !this.thirdFormGroup.value.thirdCtrl || !this.fourthFormGroup.value.fourthCtrl || !this.fifthFormGroup.value.fifthCtrl )
		{
			return;
		}

		// On récupère alors les informations du formulaire.
		this.assignment.nom = this.firstFormGroup.value.firstCtrl;
		this.assignment.course = +this.secondFormGroup.value.secondCtrl;
		this.assignment.dateDeRendu = new Date( this.thirdFormGroup.value.thirdCtrl );
		this.assignment.note = Math.min( Math.max( +this.fourthFormGroup.value.fourthCtrl, 0 ), 20 );
		this.assignment.remarque = this.fifthFormGroup.value.fifthCtrl;
		this.assignment.rendu = true;
		this.assignmentsService
			.updateAssignment( this.assignment )
			.subscribe( () =>
			{
				this.router.navigate( [ "/home" ] );
			} );
	}
}