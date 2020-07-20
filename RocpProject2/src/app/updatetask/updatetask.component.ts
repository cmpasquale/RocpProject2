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

  todosUpdatetask = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('')
  });

  todosCompletestatus=new FormGroup({
    id: new FormControl(''),
    title:new FormControl(''),
    completed:new FormControl(''),
  })
  


 /* Use  ROCP service to update task , Call to putTodosEc2 and subscribe() observable */
  putTodosEc2(todosUpdatetask:FormGroup){
        let form=JSON.stringify(todosUpdatetask.value);
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

  /*Use ROCP service to update completed Status */

  putTodosEc2complete(todoscomplete1){
    //console.log("in puttosEc2complete function  "+todoscomplete1.get('id').value);
      this.rocp.getTodosByIDforUpdate(todoscomplete1.get('id').value).subscribe(
        response1 => {
           // this.data = response1;
            //let response=JSON.parse(response1);
    
           // console.log("inside get id success :"+response1.id);
         
            // todoscomplete1.patchValue({title:response1.title});
             console.log(todoscomplete1.get('title').value);
            // let completestatus=response1.completed;
             //console.log("status before update : "+ completestatus);
             todoscomplete1.patchValue({completed:true});
           // console.log(response1.completed);
            //todoscomplete1.patchValue({completed:!completestatus});
             let form2=JSON.stringify(todoscomplete1.value);
    
            console.log("updated form:"+form2);
            // call to update 
            this.rocp.putTodos(form2).subscribe(
     
         response =>{
           console.log("success");
           console.log(response);
           this.status=true;
         },
         (error)=> {          // Error check for put request fail
           console.error("error occurred");
           let code=error;
           console.log("error in profile : "+code);
           this.status=false;
     
         }
       ) // end of put request sbscribe
      
      },
      (error)=> {      //Error check for getbyId request fail
        console.error("error occurred");
        let code=error;
        console.log("error in profile : "+code);
        this.status=false;
  
      }
     ); // end of getbyId request subscribe
      }
    
  ngOnInit(): void {
  }

}
