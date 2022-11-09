import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis?:Assignment;

  constructor(private assignmentsService: AssignmentsService,
    private router:Router) { }// Pour utiliser le service

  ngOnInit(): void {
  }

  onAssignmentRendu(){
    if(! this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;
    
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {console.log(message);
        this.router.navigate(["/home"]);
      });

      
  }
  
  onDelete(){
    if(! this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message)=> {console.log(message);
      this.router.navigate(["/home"]);
    });

   // this.assignmentTransmis = undefined; // Il faut mettre l’assignmentTransmis à null pour que la carte n’affiche plus le détail !
  }
 
}
