import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

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
    return this.httpCli.post<string[]>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos', todoForm, httpHead).pipe(catchError(this.handleError));
  }

  getTodos(): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.httpCli.get<string[]>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos', httpHead).pipe(
      catchError(this.handleError));
  }


  getTodosByID(todoId: string): Observable<string[]> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.httpCli.get<string[]>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/'
      + todoId, httpHead).pipe(catchError(this.handleError));
  }
 
  /* Update task by Id */
  putTodos(todoUpdate): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*'
      })
    };
    return this.httpCli.put<string>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/ ', todoUpdate, httpHead).pipe(
      catchError(this.handleError));
  }
    

  getTodosByIDforUpdate(todoId: string): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.httpCli.get<string>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/' + todoId, httpHead).pipe(
      catchError(this.handleError));
  }
    
  // Update Completion status (patch update)
  patchTodos(Id): Observable<string> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*'
      })
    };
    return this.httpCli.patch<string>(' http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/' + Id, httpHead).pipe(
      catchError(this.handleError));
  }
   

  // Delete to do by Id
  deleteTodos(todoId: string): Observable<any> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*',

      })
    };
    return this.httpCli.delete<any>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/'
      + todoId, httpHead).pipe(catchError(this.handleError))

  }
  truncateTodos(): Observable<any> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': '*',
      })
    };
    return this.httpCli.delete<any>('http://ec2-18-217-229-99.us-east-2.compute.amazonaws.com:8080/todos/truncate', httpHead);
  }

  private handleError(error: any) {
   // console.error(error);
    return throwError(error);
  }
}




