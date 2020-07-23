import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';
import { ITasks } from './tasks';


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  isHidden = true;
  attrtodosId = '';
  statusCode: number;
  data: any[];
  data1: any[];
  filteredData: ITasks[];
  attrtodoFilter = '';
  isChecked: boolean = false;

  get todoFilter(): string {
    return this.attrtodoFilter;
  }
  set todoFilter(temp: string) {
    this.attrtodoFilter = temp;
    if (this.isChecked) {
      console.log(this.isChecked);
      this.filteredData = this.performFilter(this.attrtodoFilter)
    }
    else {
      console.log(this.isChecked);
      this.filteredData = this.performFilterAll(this.attrtodoFilter)
    }
  }


  startFilter() {
    if (this.isChecked) {
      console.log(this.isChecked);
      this.filteredData = this.performFilter(this.attrtodoFilter)
    }
    else {
      console.log(this.isChecked);
      this.filteredData = this.performFilterAll(this.attrtodoFilter)
    }
  }


  performFilter(filterBy: string): ITasks[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.data.filter((mytask: ITasks) =>
      mytask.completed === this.isChecked &&
      mytask.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  performFilterAll(filterBy: string): ITasks[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.data.filter((mytask: ITasks) =>

      mytask.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  get todosId(): string {
    return this.attrtodosId;
  }

  set todosId(temp: string) {
    this.attrtodosId = temp;
  }



  getTodosEc2() {
    this.attrtodoFilter = '';
    this.isChecked = false;
    this.isHidden = false;
    this.todosId = '';
    this.data = [];
    this.filteredData = [];
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;

        this.statusCode = 200;
        this.filteredData = this.data
      },
      errorCode => this.statusCode = errorCode.status
    );
  }
  getTodoEc2ById(todosId: string) {
    this.isHidden = true;
    this.data = [];
    console.log("todosid" + this.todosId)
    if (todosId == "") {
      alert('Please enter a valid Task ID')
      this.data = [];
      this.statusCode = 0;
    } else if (isNaN(Number(todosId))) {
      alert('Todo ID needs to be a number')
      this.todosId = '';
      this.data = [];
      this.statusCode = 0;
    }
    else {
      this.rocp.getTodosByID(todosId).subscribe(
        response1 => {
          this.data = response1;
          this.statusCode = 201;
          console.log("data " + this.data[0]);
          console.log("todosbyid " + this.data1.length);

        },
        errorCode => {
          this.statusCode = errorCode.status;
        });

    }

  }

  ngOnInit(): void {
  }

}