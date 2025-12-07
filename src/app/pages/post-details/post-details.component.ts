import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsPage implements OnInit {
  post: Post | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsApi: PostsApiService
  ) {}

  ngOnInit(): void {
    this.initializeFromNavigationOrRoute();
  }

  /**
   * Initialize the page state from navigation history state if available,
   * otherwise read the route `id` parameter and fetch the post from the API.
   * Using `history.state` avoids the deprecated Router.getCurrentNavigation().
   */
  private initializeFromNavigationOrRoute(): void {
    // Check browser history state for a passed post object (fast path)
    const navState = (history && history.state) as { post?: Post } | undefined;
    if (navState?.post) {
      this.post = navState.post;
    }

    // Always ensure we have data: if no post in state, fetch by id from route
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!this.post && id) {
      this.loadPost(id);
    }
  }

  loadPost(id: number): void {
    this.loading = true;
    this.postsApi.getPostById(id).subscribe({
      next: (p) => {
        this.post = p;
        this.loading = false;
      },
      error: () => {
        this.post = null;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
