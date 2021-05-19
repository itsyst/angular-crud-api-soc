import { HttpClient} from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Array<any> = [];
  private url = 'http://jsonplaceholder.typicode.com/posts/';

  constructor (private http: HttpClient) {
    http.get(this.url)
      .subscribe((response) => {
        this.posts = response as Array<any>;
      });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value }
    input.value = '';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = (response as any).id;
        // this.posts.unshift(post);
        this.posts.splice(0, 0, post);
      });
  }

  ngOnInit(): void {
  }

}
