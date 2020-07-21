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
  status:boolean;
  buttonclick:boolean=false;
  todosPatch= new FormGroup({
    id:new FormControl('')
  });

  todosUpdatetask = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('')
  });

  



 /* Use  ROCP service to update task , Call to putTodosEc2 and subscribe() observable */
  putTodosEc2(todosUpdatetask:FormGroup){
        let idValue=todosUpdatetask.get('id').value;
        let form=JSON.stringify(todosUpdatetask.value);
        alert("are you sure to change Task");
        
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
      this.todosUpdatetask.reset({});
  }

  /*Use ROCP service to update completed Status */

  patchTodosEc2(todosPatch){
    //console.log("in puttosEc2complete function  "+todoscomplete1.get('id').value);
    console.log("id value: "+todosPatch.get('id').value);
    //alert("are you sure to change Status");
    this.buttonclick=true;

      this.rocp.getTodosByIDforUpdate(todosPatch.get('id').value).subscribe(
        response1 => {
            
            //console.log("inside get id success :"+response1.id);
         
           this.rocp.patchTodos(todosPatch.get('id').value).subscribe(
     
               response =>{
                  console.log("success");
                  this.status=true;
              },
              (error)=> {          // Error check for patch request fail
                //console.log("value of id "+id);
                console.log("error in profile in patch : "+error);
                this.status=false;
     
         }
       ) // end of patch request sbscribe
      
      },
      (error)=> {      //Error check for getbyId request fail
        console.error("error occurred in get by id : "+error);
        //console.log("error in profile in patch by id: "+id);
                this.status=false;
  
           }
       ); // end of getbyId request subscribe
      // this.todosPatch.reset({});
  }

  closeAll(){
    this.buttonclick=false;
    this.todosUpdatetask.reset({});
    this.todosPatch.reset({});
    

  }

    
  ngOnInit(): void {
  }

}
