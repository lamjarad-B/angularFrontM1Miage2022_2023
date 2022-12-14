import { Injectable } from "@angular/core";
import { Assignment } from "../models/assignment.model";
import { forkJoin, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { bdInitialAssignments } from "./data";

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

	constructor( private http: HttpClient ) { }

	url = "http://localhost:8010/api/assignments";
	//url = "https://api-cours-angular-2023.herokuapp.com/api/assignments";

	getAssignments(): Observable<Assignment[]>
	{
		return this.http.get<Assignment[]>( this.url );
		//return of(this.assignments); // Tranforme le tableau en un observable
	}

	getAssignmentsPagine( page: number, limit: number ): Observable<any>
	{
		return this.http.get<any>( this.url + "?page=" + page + "&limit=" + limit );
	}

	getAssignment( id: number ): Observable<Assignment | undefined>
	{
		return this.http.get<Assignment>( this.url + "/" + id ).
			pipe( map( a =>
			{
				a.nom += "transformé avec un pipe...";
				return a;
			} ),
				tap( _ =>
				{
					console.log( "tap: assignment avec id = " + id + " requête GET envoyée sur MongDB cloud" );
				} ),
				catchError( this.handleError<any>( "### catchError: getAssignments by id avec id= " + id ) )
				//catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
			);
	}

	private handleError<T>( operation: any, result?: T )
	{
		return ( error: any ): Observable<T> =>
		{
			console.log( error ); // pour afficher dans la console
			console.log( operation + ' a échoué ' + error.message );

			return of( result as T );
		};
	};

	// Ajout d'un assignment
	addAssignment( assignment: Assignment ): Observable<any>
	{
		// this.assignments.push(assignment); // Ajout d'un assignment

		// this.loggingService.log(assignment.nom, "ajouté");

		// return of("Assignment ajouté"); // on retourne une chaîne de caractère
		return this.http.post<Assignment>( this.url, assignment, this.HttpOptions );
	}

	// Modification d'un assignment
	updateAssignment( assignment: Assignment ): Observable<any>
	{
		//this.loggingService.log(assignment.nom, "modifié !");
		return this.http.put<Assignment>( this.url, assignment );
		//return of("Assignment service: assignment modifié !"); // on retourne une chaîne de caractère
	}

	// Supprimer
	deleteAssignment( assignment: Assignment ): Observable<any>
	{
		//let pos = this.assignments.indexOf(assignment);
		//this.assignments.splice(pos, 1);
		//return of("Assignment service: assignment supprimé !")

		let deleteURI = this.url + '/' + assignment._id;
		return this.http.delete( deleteURI );
	}

	//   peuplerBD() {
	//  bdInitialAssignments.forEach(a => {
	//      let nouvelAssignment = new Assignment();
	//      nouvelAssignment.nom = a.nom;
	//      nouvelAssignment.id = a.id;
	//      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
	//      nouvelAssignment.rendu = a.rendu;

	//      this.addAssignment(nouvelAssignment)
	//      .subscribe(reponse => {
	//        console.log(reponse.message);
	//      })
	//    });

	//    console.log("### TOUS LES ASSIGNMENTS SONT AJOUTES !! ###");

	//  }

	peuplerBDAvecForkJoin(): Observable<any>
	{
		const appelsVersAddAssignment: any = [];

		bdInitialAssignments.forEach( ( a ) =>
		{
			const nouvelAssignment: any = new Assignment();
			nouvelAssignment.id = a.id;
			nouvelAssignment.nom = a.nom;
			nouvelAssignment.auteur = a.auteur;
			nouvelAssignment.courseId = a.courseId;
			nouvelAssignment.dateDeRendu = new Date( a.dateDeRendu );
			nouvelAssignment.remarque = a.remarque;
			nouvelAssignment.note = a.note;
			nouvelAssignment.rendu = a.rendu;

			appelsVersAddAssignment.push( this.addAssignment( nouvelAssignment ) );
		} );
		return forkJoin( appelsVersAddAssignment ); // renvoie un seul Observable pour dire que c'est fini
	}
}