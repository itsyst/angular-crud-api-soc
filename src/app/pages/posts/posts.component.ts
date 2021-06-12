import { Component, OnInit } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { AppError } from '@/app/common/app-error';
import { BadInput } from '@/app/common/bad-input';
import { PostService } from '@/app/services/post/post.service';
import { Post } from '@/app/types/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  createPost(input: HTMLInputElement): void {
    const post: any = { title: input.value };
    // this.posts.unshift(post);
    this.posts.splice(0, 0, post);

    input.value = '';

    this.postService.create(post).subscribe({
        next: newPost => {
        post.id = newPost.id;
        },
      error: (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInput) {
            // this.form.setErrors(error.originalError);
          }
        else throw error;
      }
    });
  }

  updatePost(post: Post): void {
    this.postService.update(post).subscribe(
      (updatedPost) => {
        console.log(updatedPost);
      });
  }

  deletePost(post: Post): void {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.postService.delete(post).subscribe({
        next: () => { null},
        error: (error: AppError) => {
          // rollback the changes
          this.posts.splice(index,0, post);

          if (error instanceof NotFoundError)
            console.log('This post has already been deleted.');
          else throw error;
        }});
  }

  getPosts(): void {
    this.postService
    .getAll()
      .subscribe((posts: Post[]) => { console.log(posts); this.posts = posts })
  }

  ngOnInit(): void {
    this.getPosts();
  }
}
