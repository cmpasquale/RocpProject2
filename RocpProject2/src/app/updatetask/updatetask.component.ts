import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {ROCPService} from '../services/rocp.service';
import {FormGroup, FormControl} from '@angular/forms';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }
  data: any[];
  statusCode: number;
  todosPatch = new FormGroup({
    id: new FormControl('')
  });

  todosUpdatetask = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    completed : new FormControl('')
  });

 /* Use  ROCP service to update task , Call to putTodosEc2 and subscribe() observable */
  // tslint:disable-next-line: typedef
  putTodosEc2(todosUpdatetask1 : FormGroup){
    this.data = [];
    const idValue = todosUpdatetask1.get('id').value;
    const titleValue = todosUpdatetask1.get('title').value;
    const form = JSON.stringify(todosUpdatetask1.value);
    this.todosUpdatetask.reset({});
    this.statusCode = 0;
     // tslint:disable-next-line: triple-equals
    if (idValue == '' || idValue == null)
      {
          alert ('Please enter a valid Task ID')
      }
      else if (isNaN(Number(idValue))){
    // else if (isNaN(parseFloat(idValue))){
          alert ('Task ID needs to be a number');

        }
        // tslint:disable-next-line: triple-equals
    else if (titleValue == '' || titleValue == null)
        {
          alert ('Please enter new Task ')
        }
    else{
          this.rocp.getTodosByIDforUpdate(idValue).subscribe(
              responsebyId => {
          this.rocp.putTodos(form).subscribe(
              response => {
                  // tslint:disable-next-line: whitespace
                  this.statusCode = 200;
              },
              (error) => {
                  this.statusCode = error.status;
              }
            );
          },
             (error) => {      // Error check for getbyId request fail
                  // tslint:disable-next-line: comment-format
                  //console.log("error in profile in patch by id: "+id);
                  this.statusCode = error.status;
             }
          );
    } // end of else
}
  /*Use ROCP service to update completed Status */

  // tslint:disable-next-line: typedef
  patchTodosEc2(todosPatch){
    this.statusCode = 0;
    this.data = [];
    const idValue = todosPatch.get('id').value;
    this.todosPatch.reset({});
    // tslint:disable-next-line: triple-equals
    if (idValue == '' || idValue == null)
      {
          alert ('Please enter a valid Task ID')
      }
    else if (isNaN(Number(idValue))){
    // else if (isNaN(parseFloat(idValue))){
          alert ('Task ID needs to be a number');

        }
    else {
            this.rocp.getTodosByIDforUpdate(idValue).subscribe(
              response1 => {
                  this.rocp.patchTodos(idValue).subscribe(
                        response => {
                            this.statusCode = 201;
                        },
                        (error) => {          // Error check for patch request fail
                            this.statusCode = error.status;
                        }
                  );  // end of patch request sbscribe
             },
              (error) => {      // Error check for getbyId request fail
                  this.statusCode = error.status;
              }
           ); // end of getbyId request subscribe
           
          } // end of else (validation clear)
  }

  // tslint:disable-next-line: typedef
  getTodosEc2() {
    this.todosPatch.reset({});
    this.todosUpdatetask.reset({});
    this.statusCode = 0;
    this.rocp.getTodos().subscribe(
      response => {
        this.data = response;
      },
      (error) => {this.statusCode = error.status ;}
    );
  }

  ngOnInit(): void {
  }

}
