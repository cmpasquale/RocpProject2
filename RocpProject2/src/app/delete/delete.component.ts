import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROCPService } from '../services/rocp.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rocp: ROCPService) { }

  todosId = '';

  deleteTodoEc2ById(todosId: string): any {
    this.rocp.deleteTodos(todosId).subscribe(
      response => {
        console.log( todosId + ' todo deleted');
      }
    );
  }
  ngOnInit(): void {
  }

}
