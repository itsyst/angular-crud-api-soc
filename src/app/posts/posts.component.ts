import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Array<any> = [];

  constructor(private service: PostService) {
  }

  createPost(input: HTMLInputElement): void {
    const post: any = { title: input.value };
    input.value = '';

    this.service
        .createPost(post)
        .subscribe(response => {
        post.id = (response as any).id;
        // this.posts.unshift(post);
        this.posts.splice(0, 0, post);
        }, (error: Response) => {
          if (error.status === 400) {
            // this.form.setErrors(error.json())
          }
          else{
           alert('An unexpected error occurred.');
            console.log(error);
          }
        });
  }

  updatePost(post: any): void {
    // we send only the property that we wont to change not the all object
    // this.http.put(this.url, JSON.stringify(post))
    this.service
        .updatePost(post)
        .subscribe(response => {
        console.log(response);
      }, (error: any) => {
          alert('An unexpected error occurred.');
          console.log(error);
        });
  }

  deletePost(post: any): void {
    this.service
        .deletePost(post.id)
        .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        }, (error: Response) => {
          if (error.status === 404)
            alert('This post has already been deleted.')
          else
            alert('An unexpected error occurred.');
            console.log(error);
        });
  }

  ngOnInit(): void {
    this.service
        .getPosts()
      .subscribe(
          response => {
          this.posts = response as Array<any>;
        },
          error  => {
          alert('An unexpected error occurred.');
          console.log(error);
        });
  }
}
