import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ROCPService} from '../services/rocp.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  attrtodosId = '';

  get todosId(): string {
    return this.attrtodosId;
  }

  set todosId(temp: string) {
      this.attrtodosId = temp;
  }

  currentHero = 'No Hero';
  // I am making an object version of my form that I WILL pair with the form I will create on the HTML page.
  //This is using the reactive Forms module
  todos = new FormGroup({
    title: new FormControl('')
    });

    todosById = new FormGroup({
      titleById: new FormControl('')});

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  postTodoEc2(todoSub: FormGroup) {
    let form = JSON.stringify(todoSub.value);
    console.log(form);
    console.log(todoSub);
    this.rocp.postTodo(form).subscribe(
      response => {
        console.log('success');

      }
    );

  }


  getTodosEc2() {
    this.rocp.getTodos().subscribe(
      response => {
        console.log(response);
      }
    );
  }

  getTodoEc2ById(todosId: string) {
    console.log(todosId);
    this.rocp.getTodosByID(todosId).subscribe(
      response => {
        console.log(response);
      }
    );
      }

  ngOnInit(): void {
    this.currentHero = this.route.snapshot.paramMap.get('heroname');
  }

}
