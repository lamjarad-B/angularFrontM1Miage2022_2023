import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments = [
    {
      nom:"TP1 web components",
      dateDeRendu: new Date("2022-09-29"),
      rendu: true
    },
    {
      nom:"TP2 Angular",
      dateDeRendu: new Date("2022-10-13"),
      rendu: false
    },
    {
      nom:"Mini projet angular",
      dateDeRendu: new Date("2023-01-05"),
      rendu: true
    },
  ]

  constructor() { }
  
  getAssignments():Observable<Assignment[]>{
    return of(this.assignments); // Tranforme le tableau en un observable
  }

  // Ajout d'un assignment
  addAssignment(assignment: Assignment): Observable<string>{
    this.assignments.push(assignment); // Ajout d'un assignment
    return of('Assignment ajouté'); // on retourne une chaine de caractère
  }

  // Modification d'un assignment
  updateAssignment(assignment: Assignment): Observable<string>{
    return of('Assignment service: assignment modifié !'); // on retourne une chaine de caractère
  }

  // Supprimer
  deleteAssignment(assignment:Assignment):Observable<string>{
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);
    return of("Assignment service: assignment supprimé !")
  }
}
