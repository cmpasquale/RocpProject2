import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {ROCPService} from '../services/rocp.service';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }
  status:boolean;
  buttonclick:boolean=false;

  todosUpdate = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('')
  });



 /* use  ROCP service , call to putTodosEc2 and subscribe() observable */
  putTodosEc2(todosUpdate:FormGroup){
        let form=JSON.stringify(todosUpdate.value);
        console.log(form);
        this.buttonclick=true;

        this.rocp.putTodos(form).subscribe(
         response =>{
            console.log(response);
            // tslint:disable-next-line: whitespace
            this.status= true;
      },
      (error)=> {
        // console.error("error occurred");
         let code=error;
          console.log("error checked  in update component : "+code);
          this.status=false;
          }
      )
  }


  ngOnInit(): void {
  }

}
