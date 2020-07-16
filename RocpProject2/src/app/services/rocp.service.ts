import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ROCPService {

  constructor(private httpCli: HttpClient) { }

  postTodo(todoForm): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.httpCli.post<string[]>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos', todoForm, httpHead);
  }

  getTodos(): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.httpCli.get<string[]>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos', httpHead);
  }


  getTodosByID(todoId: string): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.httpCli.get<string[]>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/' + todoId, httpHead);
  }
 
  /* Update task by Id */
  putTodos(todoUpdate): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*'
      })
    };
    return this.httpCli.put<string>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/ ', todoUpdate, httpHead);
  }
  // Delete to do by Id
  deleteTodos(todoDelete): Observable<any> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*',
        todoDelete

      })
    };
    return this.httpCli.delete('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/ ', httpHead);
  }
}