import { Component, OnInit } from '@angular/core';
import { NotFoundError, Subscription } from 'rxjs';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { PostService } from '../services/post.service';
import { Post } from '../types/Post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  createPost(input: HTMLInputElement): void {
    const post: any = { title: input.value };
    input.value = '';

    this.postService.createPost(post).subscribe({
        next: response => {
        post.id = (response as any).id;
        // this.posts.unshift(post);
        this.posts.splice(0, 0, post);
        },
        error: (error: AppError) => {
          if (error instanceof BadInput) {
            // this.form.setErrors(error.originalError);
          }
          else throw error;
        }});
  }

  updatePost(post: any): void {
    // we send only the property that we wont to change not the all object
    // this.http.put(this.url, JSON.stringify(post))
    this.postService.updatePost(post).subscribe(
      (response) => {
        console.log(response);
      });
  }

  deletePost(post: Post): void {
    // this.service
    //     .deletePost(post.id)
    //     .subscribe(response => {
    //     const index = this.posts.indexOf(post);
    //     this.posts.splice(index, 1);
    //     }, (error: Response) => {
    //       if (error.status === 404)
    //         alert('This post has already been deleted.')
    //       else
    //         alert('An unexpected error occurred.');
    //         console.log(error);
    //     });
    // the above method is deprecated

    this.postService.deletePost(post.id).subscribe({
        next: () => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        error: (error: AppError) => {
          if (error instanceof NotFoundError)
            console.log('This post has already been deleted.');
          else throw error;
        }});
  }

  getPosts() {
    this.postService
    .getPosts()
    .subscribe(
      (response: Post[]) => this.posts = response,
    )
  }

  ngOnInit(): void {
    // this.postService
    //     .getPosts()
    //   .subscribe(
    //       response => {
    //       this.posts = response as Array<any>;
    //     },
    //       error  => {
    //       alert('An unexpected error occurred.');
    //       console.log(error);
    //     });
    this.getPosts();
  }
}
