import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ROCPService} from '../services/rocp.service';


@Component({
    selector: 'app-get',
    templateUrl: './get.component.html',
    styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit{
  attrtodosId = '';
  statusCode: number;
  data:any[];

  get todosId(): string {
    return this.attrtodosId;
  }

  set todosId(temp: string) {
      this.attrtodosId = temp;
  }

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  getTodosEc2() {
    this.todosId = '';
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
        this.statusCode = 200;
        },
        errorCode => this.statusCode = errorCode.status
    );
  }
 getTodoEc2ById(todosId: string) {

      this.data =[];
      if (todosId == "")
      {
          alert ('Please enter a valid Task ID')
        this.data = [];
     this.statusCode = 0;
   } else if (isNaN(Number(todosId))){
            alert ('Todo ID needs to be a number')
            this.todosId = '';
            this.data =[];
            this.statusCode = 0;
           
    
        }
        else
      {
        this.rocp.getTodosByID(todosId).subscribe(
          response1 => {
           this.data = response1;
           this.statusCode = 201;
           },
          errorCode =>{
           this.statusCode = errorCode.status;
           } );

      }
     
    }

  ngOnInit(): void {
  }

}
