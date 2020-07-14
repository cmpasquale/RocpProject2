import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentHero = 'No Hero';

  todos = new FormGroup({
    title: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  postTodoEc2(todoSub: FormGroup) {
    let form = JSON.stringify(todoSub.value);
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

  ngOnInit(): void {
    this.currentHero = this.route.snapshot.paramMap.get('heroname');
  }

}
