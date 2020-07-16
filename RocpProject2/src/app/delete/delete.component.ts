import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  todosDelete = new FormGroup({
    id: new FormControl(''),
  });


  /* use  ROCP service  */
  deleteTodo(todosDelete: FormGroup) {
    let form = JSON.stringify(todosDelete.value);
    console.log(form);
    this.rocp.deleteTodos(todosDelete).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  ngOnInit(): void {
  }

}
