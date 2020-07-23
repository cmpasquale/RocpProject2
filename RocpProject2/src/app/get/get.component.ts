import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ROCPService} from '../services/rocp.service';
import { ITasks } from './tasks';


@Component({
    selector: 'app-get',
    templateUrl: './get.component.html',
    styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit{
  isHidden= true;
  attrtodosId = '';
  statusCode: number;
  data: any[];
  filteredData: ITasks[];
  attrtodoFilter = '';
  completedstatus : boolean;
  
  get todoFilter(): string {
    return this.attrtodoFilter;
  }
  set todoFilter(temp: string) {
    this.attrtodoFilter = temp;
    this.filteredData = this.attrtodoFilter ?
    this.performFilter(this.attrtodoFilter) : this.data;
    console.log(this.filteredData[0]);
}
performFilter(filterBy: string):ITasks[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.data.filter((mytask:ITasks) => 
  mytask.title.toLocaleLowerCase().indexOf(filterBy) !==-1);
}






  get todosId(): string {
    return this.attrtodosId;
  }

  set todosId(temp: string) {
      this.attrtodosId = temp;
  }

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  getTodosEc2() {
    this.isHidden= false;

    this.todosId = '';
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
        console.log('data ' + this.data)
        this.statusCode = 200;
        this.filteredData = this.data
        },
        errorCode => this.statusCode = errorCode.status
    );
  }
 getTodoEc2ById(todosId: string) {
    this.isHidden= true;
      this.data = [];
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