import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  id: number;
  title: string;
  createdon: string;
  completed: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
