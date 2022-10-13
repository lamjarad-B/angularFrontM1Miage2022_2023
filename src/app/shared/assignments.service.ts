import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({ // injecter tous les services qui ont provideIn root à la racine directement
  // Permet d'éviter d'ajouter les services dans les modules
  providedIn: 'root'
})
export class AssignmentsService {

  assignments:Assignment[] = [
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

  constructor(private loggingService:LoggingService) { }
  
  getAssignments():Observable<Assignment[]>{
    return of(this.assignments); // Tranforme le tableau en un observable
  }

  // Ajout d'un assignment
  addAssignment(assignment: Assignment): Observable<string>{
    this.assignments.push(assignment); // Ajout d'un assignment

    this.loggingService.log(assignment.nom, "ajouté");

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
