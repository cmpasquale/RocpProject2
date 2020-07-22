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
  status: boolean;
  buttonclick = false;
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
  putTodosEc2(todosUpdatetask1:FormGroup){
    this.data = [];
    const idValue = todosUpdatetask1.get('id').value;
    const titleValue = todosUpdatetask1.get('title').value;
    const form = JSON.stringify(todosUpdatetask1.value);
    this.todosUpdatetask.reset({});
    this.buttonclick = false;
    // tslint:disable-next-line: no-unused-expression
    // tslint:disable-next-line: triple-equals
    console.log('value of id :' + idValue);
    console.log('form: ' + form);
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
         // console.log(parseFloat(idValue)); 
          alert('Are you sure to change Task');
          console.log(form);
          this.buttonclick = true;
          this.rocp.getTodosByIDforUpdate(idValue).subscribe(
              responsebyId => {
          this.rocp.putTodos(form).subscribe(
              response => {
                  console.log(response);
                  // tslint:disable-next-line: whitespace
                  this.status= true;
              },
              (error) => {
                // console.error("error occurred");
                const code = error;
                console.log('error checked  in update component : ' + code);
                this.status = false;
              }

            );
          },
             (error) => {      // Error check for getbyId request fail
                  console.error('error occurred in get by id : '+ error);
                  // tslint:disable-next-line: comment-format
                  //console.log("error in profile in patch by id: "+id);
                  this.status = false;
             }
          );
    } // end of else
}
  /*Use ROCP service to update completed Status */

  // tslint:disable-next-line: typedef
  patchTodosEc2(todosPatch){
    // console.log("in puttosEc2complete function  "+todoscomplete1.get('id').value);
    this.data = [];
    const idValue = todosPatch.get('id').value;
    console.log('id value: ' + idValue);
    this.todosPatch.reset({});
    this.buttonclick = false;

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
            alert('Are you sure to change Status');
            this.buttonclick = true;

            this.rocp.getTodosByIDforUpdate(idValue).subscribe(
              response1 => {
              // console.log("inside get id success :"+response1.id);
                  this.rocp.patchTodos(idValue).subscribe(
                        response => {
                            console.log('success');
                            this.status = true;
                        },
                        (error) => {          // Error check for patch request fail
                          // console.log("value of id "+id);
                          console.log('error in profile in patch : '+ error);
                          this.status = false;
                        }
                  );  // end of patch request sbscribe

             },
              (error) => {      // Error check for getbyId request fail
                  console.error('error occurred in get by id : '+ error);
                  // tslint:disable-next-line: comment-format
                  //console.log("error in profile in patch by id: "+id);
                  this.status = false;
              }
           ); // end of getbyId request subscribe
           
          } // end of else (validation clear)
  }

  // tslint:disable-next-line: typedef
  closeAll(){
    this.buttonclick = false;

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

  ngOnInit(): void {
  }

}
