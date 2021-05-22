import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Array<any> = [];
  postSubscription: Subscription = new Subscription;

  constructor(private service: PostService) {
  }

  createPost(input: HTMLInputElement): void {
    const post: any = { title: input.value };
    input.value = '';

    this.service
        .createPost(post)
      .subscribe({
        next: response => {
        post.id = (response as any).id;
        // this.posts.unshift(post);
        this.posts.splice(0, 0, post);
        },
        error: (error: Response) => {
          if (error.status === 400) {
            // this.form.setErrors(error.json())
          }
          else{
            console.error('An unexpected error occurred.', error);
            console.log(error);
          }
        }});
  }

  updatePost(post: any): void {
    // we send only the property that we wont to change not the all object
    // this.http.put(this.url, JSON.stringify(post))
    this.service
        .updatePost(post)
      .subscribe({
         next: (response) => {
          console.log(response);
      },
      error: (error: any) => {
        console.error('An unexpected error occurred.', error);
        console.log(error);
      }});
  }

  deletePost(post: any): void {
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

    this.service
        .deletePost(post.id)
      .subscribe({
        next: (response) => {
          const index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        error:  (error: Response) => {
          if (error.status === 404)
          console.log('This post has already been deleted.');
          else
            console.error('An unexpected error occurred.', error),
            console.log(error);
        }});
  }

  getPosts() {
    this.postSubscription = this.service
    .getPosts()
    .subscribe({
      next: (response) => this.posts = response as Array<any>,
      error: (error:Response) => console.error('An unexpected error occurred.', error),
      complete: () => console.info('complete')
    })
  }

  ngOnInit(): void {
    // this.service
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

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
