import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis!:Assignment;
  constructor() { }

  ngOnInit(): void {
  }

  onAssignmentRendu(){
    this.assignmentTransmis.rendu = true;
  }

}
