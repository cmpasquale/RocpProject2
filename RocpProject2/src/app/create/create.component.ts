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

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }
  todos = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('')
    
    });
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
  ngOnInit(): void {
  }

}
