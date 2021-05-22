import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Post[]>(this.url);
  }

  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(this.url, JSON.stringify(post))
      .pipe(catchError((error: Response) => {
        if (error.status === 404)
          return throwError(() => new BadInput(error.json()));
        return throwError(() => new AppError(error.json()));
      }));
  }

  updatePost(post: any): Observable<Object> {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRed: true }))
  }

  deletePost(id: number){
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError((error: Response) => {
        if (error.status === 404)
          return throwError(() => new AppError(NotFoundError));
        return throwError(() => new AppError(error));
      }));
  }
}
