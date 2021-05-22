import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotFoundError, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { Post } from '../types/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts/';

  constructor (private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url)
      .pipe(catchError(() => this.handelError));
  }

  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(this.url, JSON.stringify(post))
      .pipe(catchError(() => this.handelError));;
  }

  updatePost(post: any): Observable<Object> {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRed: true }))
      .pipe(catchError(() => this.handelError));
  }

  deletePost(id: number){
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(() => this.handelError));
  }

  private handelError(error: HttpErrorResponse) {
    if (error.status === 400)
      return new BadInput(error);

    if (error.status === 404)
      return  new AppError(NotFoundError);

    return  new AppError(error);
  }
}
