import { Injectable } from "@angular/core";
import { Assignment } from "../models/assignment.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { initialAssignments } from "./data";
import { Course } from "../models/course.model";
import { CoursesService } from "./courses.service";

@Injectable( { // injecter tous les services qui ont provideIn root à la racine directement
	// Permet d'éviter d'ajouter les services dans les modules
	providedIn: "root"
} )

export class AssignmentsService
{
	private HttpOptions = {
		headers: new HttpHeaders( {
			"Content-Type": "application/json"
		} )
	};

	assignments: Assignment[] = [];

	constructor( private http: HttpClient, private courseService: CoursesService ) { }

	url = "http://localhost:8010/api/assignments";
	//url = "https://api-cours-angular-2023.herokuapp.com/api/assignments";

	// Récupération de tous les devoirs.
	getAssignments( page: number, limit: number, name: string, rendu: boolean ): Observable<any>
	{
		return this.http.get<any>( this.url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&rendu=" + rendu );
	}

	// Récupération d'un seul devoir.
	getAssignment( id: number ): Observable<Assignment | undefined>
	{
		return this.http.get<Assignment>( this.url + "/" + id );
	}

	// Ajout d'un devoir.
	addAssignment( assignment: Assignment ): Observable<any>
	{
		return this.http.post<Assignment>( this.url, assignment, this.HttpOptions );
	}

	// Modification d'un devoir.
	updateAssignment( assignment: Assignment ): Observable<any>
	{
		return this.http.put<Assignment>( this.url, assignment );
	}

	// Suppression d'un devoir.
	deleteAssignment( assignment: Assignment ): Observable<any>
	{
		return this.http.delete( this.url + "/" + assignment._id );
	}

	// Peuplement des devoirs.
	peuplerBDAvecForkJoin(): void
	{
		initialAssignments.forEach( ( a ) =>
		{
			this.courseService.getCourse( a.course ).subscribe( ( course: Course ) =>
			{
				const newAssignment: any = new Assignment();
				newAssignment.id = a.id;
				newAssignment.nom = a.nom;
				newAssignment.auteur = a.auteur;
				newAssignment.course = course.id;
				newAssignment.dateDeRendu = new Date( a.dateDeRendu );
				newAssignment.remarque = a.remarque;
				newAssignment.note = a.note;
				newAssignment.rendu = a.rendu;

				this.addAssignment( newAssignment ).subscribe( () => { } );
			} );
		} );
	}
}