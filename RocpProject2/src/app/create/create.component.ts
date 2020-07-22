import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ROCPService} from '../services/rocp.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  statusCode: number;
  data:any[];
  taskInput: string;
 
  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }
  todos = new FormGroup({
    completed: new FormControl(''),
    title: new FormControl('')
   });

   clear(){
     console.log("task input" + this.taskInput)
    this.taskInput = '';
    }

  postTodoEc2(todoSub: FormGroup) {
    const titleValue = todoSub.get('title').value;
    if (titleValue == '' || titleValue == null)
      {alert ('Please enter a valid Task Title')
        this.statusCode = 0;}
    else {
      let form = JSON.stringify(todoSub.value);
      console.log('form ' + form);
      console.log(todoSub);
      this.rocp.postTodo(form).subscribe(
        response => {
          console.log('success');
          this.statusCode = 200;
          this.rocp.getTodos().subscribe(
            response1 => {
              this.data = response1;
             // this.statusCode = 200;
              },
              errorCode => this.statusCode = errorCode.status
          );
           },
           errorCode => this.statusCode = errorCode.status

      );
      

    }

  }
  ngOnInit(): void {
  }

}
