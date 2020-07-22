import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

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
  statusCode: number;

  deleteTodoEc2ById(todosId: string): any {
    this.data = [];
    if (todosId === '') {
      alert('Please enter a valid Task ID');
      this.data = [];
      this.statusCode = 0;
    }
    else if (isNaN(Number(todosId))) {
      alert('Todo ID needs to be a number');
      this.todosId = '';
      this.data = [];
      this.statusCode = 0;
    }
    else {
      this.rocp.deleteTodos(todosId).subscribe(
        response => {
          this.data = response;
          this.statusCode = 204;
        },
        errorCode => {
          this.statusCode = errorCode.status;
        });
    }
  }
    getTodosEc2() {
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
        this.statusCode = 200;
      },
      errorCode => this.statusCode = errorCode.status
    );
      }
      truncateAPI() {
    this.rocp.truncateTodos().subscribe(
      response => {
        console.log('truncated table');
        this.getTodosEc2();
      }
    );
  }
      ngOnInit(): void {
  }

}
