import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Array<any> = [];
  private url = 'http://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) {
  }

  createPost(input: HTMLInputElement): void {
    const post: any = { title: input.value };
    input.value = '';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = (response as any).id;
        // this.posts.unshift(post);
        this.posts.splice(0, 0, post);
      });
  }

  updatePost(post: any): void {
    // we send only the property that we wont to change not the all object
    // this.http.put(this.url, JSON.stringify(post))
    this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRed: true }))
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(post: any): void {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }

  ngOnInit(): void {
    this.http.get(this.url)
      .subscribe((response) => {
        this.posts = response as Array<any>;
      });
  }
}
