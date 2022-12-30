import { OnInit, ViewChild, Component } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "../shared/auth.service";
import { AssignmentsService } from "../shared/assignments.service";
import { CoursesService } from "src/app/shared/courses.service";
import { Assignment } from "../models/assignment.model";
import { Course } from "../models/course.model";

@Component( {
	selector: "app-assignments",
	templateUrl: "./assignments.component.html",
	styleUrls: [ "./assignments.component.css" ]
} )

export class AssignmentsComponent implements OnInit
{
	// Pagination et tri des résultats.
	@ViewChild( MatPaginator )
	paginator!: MatPaginator;

	@ViewChild( MatSort )
	sort!: MatSort;

	// Propriétés du composant.
	nomDevoir = "";
	remarque = "";
	note = 0;
	rendu = false;
	course = 0;
	dataSource!: MatTableDataSource<Assignment>;
	displayedColumns: string[] = [ "id", "name", "author", "course", "date", "remarque", "note", "rendu" ];

	// Devoir sélectionné par l'utilisateur.
	selection!: Assignment | undefined;

	// Affichage ou non du formulaire d'ajout d'un devoir.
	formVisible = false;

	// Pour la pagination des résultats.
	page: number = 1;
	limit: number = 1000;
	totalDocs!: number;
	totalPages!: number;
	hasPrevPage!: boolean;
	prevPage!: number;
	hasNextPage!: boolean;
	nextPage!: number;
	nameFilter!: string;
	renduFilter!: boolean;
	courses!: string[];
	assignments!: Assignment[];

	// État de connexion
	isLogged = this.authService.isLogged;

	// L'utilisateur est-il un administrateur ?
	isAdmin = this.authService.isAdmin;

	// Constructeur.
	constructor(
		private authService: AuthService,
		private coursesService: CoursesService,
		private assignmentsService: AssignmentsService
	) { }

	// Méthode d'initialisation.
	ngOnInit(): void
	{
		// Récupération de toutes les matières (avec pagination).
		this.coursesService.getCourses( this.page, this.limit ).subscribe( courses =>
		{
			// Transformation des données pour n'avoir que le nom des matières.
			this.courses = courses.docs.map( ( course: Course ) =>
			{
				return course.nom;
			} );

			// Récupération de tous les devoirs (avec pagination).
			this.assignmentsService.getAssignments( this.page, this.limit, this.nameFilter, this.renduFilter )
				.subscribe( assignments =>
				{
					this.assignments = assignments.docs;
					this.page = assignments.page;
					this.limit = assignments.limit;
					this.totalDocs = assignments.totalDocs;
					this.totalPages = assignments.totalPages;
					this.hasPrevPage = assignments.hasPrevPage;
					this.prevPage = assignments.prevPage;
					this.hasNextPage = assignments.hasNextPage;
					this.nextPage = assignments.nextPage;

					// Modification des données pour n'avoir que le nom des matières.
					this.assignments = this.assignments.map( ( assignment: Assignment ) =>
					{
						assignment.course = this.courses[ assignment.course as number - 1 ];
						return assignment;
					} );

					// Création du tableau de données.
					this.dataSource = new MatTableDataSource( this.assignments );
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				} );
		} );
	}

	// Méthode pour sélectionner un devoir.
	assignmentClique( assignment: Assignment )
	{
		if ( this.selection === assignment )
		{
			// Si le devoir est déjà sélectionné, on cache alors ses détails.
			this.selection = undefined;
		}
		else
		{
			// Dans le cas contraire, on met à jour les détails du devoir.
			this.selection = assignment;
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

	// Méthode pour filtrer les résultats de la recherche (nom du devoir).
	applyFilter( event: Event )
	{
		const filterValue = ( event.target as HTMLInputElement ).value;
		this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : "";

		if ( this.dataSource.paginator )
		{
			this.dataSource.paginator.firstPage();
		}
	}

	// Méthode pour filtrer les résultats des recherches (devoir rendu ou non).
	onUpdateRenduFilter()
	{
		this.ngOnInit();
	}
}