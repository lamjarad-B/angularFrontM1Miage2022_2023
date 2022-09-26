import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Mon application sur les Assignments !"
  assignments = [
    {
      nom:"TP1 web components",
      dateDeRendu:'2022-09-29',
      rendu: true
    },
    {
      nom:"TP2 Angular",
      dateDeRendu:'2022-10-13',
      rendu: false
    },
    {
      nom:"Mini projet angular",
      dateDeRendu:'2023-01-05',
      rendu: true
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
