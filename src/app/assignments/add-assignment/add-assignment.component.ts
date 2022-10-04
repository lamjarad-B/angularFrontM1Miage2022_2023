import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

    //Proprietes du formulaire
    nomDevoir!:string; // Pour récupérer la valeur du champs nom

    dateRendu!: Date; // Pour récupérer la valeur du champs dateDeRendu
    //////

    @Output() nouvelAssignment = new EventEmitter<Assignment>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.nomDevoir + "date de rendu = " + this.dateRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    //this.assignments.push(newAssignment);
    this.nouvelAssignment.emit(newAssignment);
  }

}
