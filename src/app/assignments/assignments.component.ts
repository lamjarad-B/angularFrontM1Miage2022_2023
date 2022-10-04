import { Component, OnInit } from '@angular/core';
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
  assignementSelectionne!:Assignment;

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

  ngOnInit(): void {
    setTimeout(() => { // ça permet d'activer le button après 2 secodes
      this.ajoutActive = true;
    }, 2000)
  }

  onSubmit() {
    console.log(this.nomDevoir + "date de rendu = " + this.dateRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    this.assignments.push(newAssignment);
  }
  assignmentClique(assignment:Assignment) {
    this.assignementSelectionne = assignment;
  }
  
}
