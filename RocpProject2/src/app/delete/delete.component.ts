import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  todosId = '';
  attrtodosId = '';
  data: any[];

  deleteTodoEc2ById(todosId: string): any {
    alert("Are you sure you want to delete?");
    this.rocp.deleteTodos(todosId).subscribe(
      response => {
        this.data = response;
        console.log(todosId + ' todo deleted');
        this.getTodosEc2();
      }
    );
  }

  getTodosEc2() {
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
        console.log('data' + this.data);
        console.log('datalength' + this.data.length);
      }
    );
  }
  ngOnInit(): void {
  }

}
