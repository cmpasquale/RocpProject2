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
  data:any[];
  get todosId(): string {
    return this.attrtodosId;
  }

  set todosId(temp: string) {
      this.attrtodosId = temp;
  }

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  getTodosEc2() {
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
        console.log("data" + this.data);
        console.log("datalength" + this.data.length);
      }
    );
  }
 getTodoEc2ById(todosId: string) {
      this.rocp.getTodosByID(todosId).subscribe(
      response1 => {
       this.data = response1;
       console.log("data" + this.data);
       console.log("datalength" + this.data.length);
      }
    );
      }

  ngOnInit(): void {
  }

}
