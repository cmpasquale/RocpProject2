import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  todosId = '';
  statusCode: number;
  data: any[];

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  deleteTodoEc2ById(todosId: string): any {
      this.rocp.deleteTodos(todosId).subscribe(
        response1 => {
          this.data = response1;
          this.statusCode = 204;
          this.getTodosEc2();
        },
        errorCode => {
          this.statusCode = errorCode.status;
        });

    }
  getTodoEc2ById(todosId: string): any {
    this.data = [];
    if (todosId === '') {
      alert('Please enter a valid Task ID');
      this.data = [];
      this.statusCode = 0;
    } else if (isNaN(Number(todosId))) {
      alert('Todo ID needs to be a number');
      this.todosId = '';
      this.data = [];
      this.statusCode = 0;
    }
    else {
      this.rocp.getTodosByID(todosId).subscribe(
        response => {
          this.data = response;
          this.deleteTodoEc2ById(this.todosId);
          this.getTodosEc2();
        },
        errorCode => {
          this.statusCode = errorCode.status;
        });

    }
  }

    getTodosEc2(): any {
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
        console.log(response);
      },
      errorCode => this.statusCode = errorCode.status
    );
      }
      truncateAPI(): any {
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
