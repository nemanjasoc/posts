import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgSelectModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // posts API
  posts: Post[] = [];
  total = 0;
  page = 1;
  readonly pageSize = 10;
  searchQuery = '';
  selectedTag: string | null = null;
  selectedPost: Post | null = null;
  loading = false;

  // tags to display in select
  readonly tags = ['history', 'american', 'crime', 'magical', 'french'];

  constructor(
    private auth: AuthService,
    private router: Router,
    private postsApi: PostsApiService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.loadPosts();
  }

  get username(): string {
    const user = this.auth.getUser();
    return user?.username || '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  loadPosts(): void {
    this.loading = true;
    const skip = (this.page - 1) * this.pageSize;

    this.postsApi
      .searchPosts({ limit: this.pageSize, skip, query: this.searchQuery })
      .subscribe({
        next: (response) => {
          this.posts = response.posts || [];
          this.total = response.total || 0;
          this.loading = false;
          // clear selected post if it's not on current page
          if (this.selectedPost && !this.posts.find((post) => post.id === this.selectedPost!.id)) {
            this.selectedPost = null;
          }
          this.changeDetector.markForCheck();
        },
        error: () => {
          this.posts = [];
          this.total = 0;
          this.loading = false;
          this.changeDetector.markForCheck();
        }
      });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber < 1) return;
    const lastPage = Math.max(1, Math.ceil(this.total / this.pageSize));
    if (pageNumber > lastPage) return;
    this.page = pageNumber;
    this.loadPosts();
  }

  onRowClick(post: Post): void {
    this.selectedPost = post;
  }

  rowHighlightClass(post: Post): boolean {
    return !!(
      this.selectedTag &&
      post?.tags &&
      Array.isArray(post.tags) &&
      post.tags.includes(this.selectedTag)
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.page;
    const maxVisible = 3;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    // Always try to show: [current-1, current, current+1]
    let start = Math.max(1, current - 1);
    let end = Math.min(total, start + maxVisible - 1);

    // Adjust if we're near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  get canPrevious(): boolean {
    return this.page > 1;
  }

  get canNext(): boolean {
    return this.page < this.totalPages;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedTag = null;
    this.page = 1;
    this.loadPosts();
  }
}
