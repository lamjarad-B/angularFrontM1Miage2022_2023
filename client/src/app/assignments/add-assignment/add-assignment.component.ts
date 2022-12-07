import { Component, OnInit} from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
	selector: 'app-add-assignment',
	templateUrl: './add-assignment.component.html',
	styleUrls: ['./add-assignment.component.css']
})

export class AddAssignmentComponent implements OnInit {
	nomDevoir!: string; // Pour récupérer la valeur du champs nom
	dateRendu!: Date; // Pour récupérer la valeur du champs dateDeRendu

	constructor(private assignmentsService: AssignmentsService) { }

	ngOnInit(): void {}

	onSubmit() {
		console.log(this.nomDevoir + "date de rendu = " + this.dateRendu);

		const newAssignment = new Assignment();
		newAssignment.id = Math.floor(Math.random()*10000);
		newAssignment.nom = this.nomDevoir;
		newAssignment.dateDeRendu = this.dateRendu;
		newAssignment.rendu = false;

		this.assignmentsService.addAssignment(newAssignment).subscribe(message => console.log(message));
	}
}