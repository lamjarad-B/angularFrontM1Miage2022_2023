import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Mon application sur les Assignments !"
  
  ajoutActive = false; // pour le button dans le fichier html

  //Proprietes du formulaire
  nomDevoir=""; // Pour récupérer la valeur du champs nom

  dateRendu!: Date; // Pour récupérer la valeur du champs dateDeRendu
  
  //
  assignmentSelectionne!:Assignment;
  //

  formVisible=false;

  assignments!:Assignment[];
  
  constructor(private assignmentService: AssignmentsService) { } //Ingection des services

  ngOnInit(): void {
    //this.assignments = this.assignmentsServices.getAssignments();// utilisation des services
    this.getAssignment();
  }

  getAssignment(){// Renvoie un Observable
    this.assignmentService.getAssignments()
      .subscribe(assignments => this.assignments = assignments);
  }
 
  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }
  
  onAddAssignmentBtnClick(){
    this.formVisible = true;
  }
  onNouvelAssignment(event:Assignment){
    //this.assignments.push(event);
    this.assignmentService.addAssignment(event)
    .subscribe(message => console.log(message)
    );
    this.formVisible = false;
  }

 
  
}
