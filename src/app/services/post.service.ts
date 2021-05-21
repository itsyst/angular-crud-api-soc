import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts/';

  constructor (private http: HttpClient) { }

  getPosts(): Observable<Object> {
    return this.http.get(this.url);
  }

  createPost(post: any): Observable<Object> {
   return this.http.post(this.url, JSON.stringify(post))
  }

  updatePost(post: any): Observable<Object> {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRed: true }))
  }

  deletePost(id: string): Observable<Object> {
    return this.http.delete(this.url + '/' + id)
  }
}
