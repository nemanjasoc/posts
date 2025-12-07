import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostsSearchResponse, PostsSearchParams } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private readonly baseUrl = environment.postsApiBaseUrl;

  constructor(private http: HttpClient) {}

  searchPosts(searchParams: PostsSearchParams): Observable<PostsSearchResponse> {
    let httpParams = new HttpParams()
      .set('limit', String(searchParams.limit))
      .set('skip', String(searchParams.skip));

    if (searchParams.query && searchParams.query.trim()) {
      httpParams = httpParams.set('q', searchParams.query.trim());
    }

    return this.http.get<PostsSearchResponse>(this.baseUrl, { params: httpParams });
  }

  getPostById(postId: number): Observable<Post> {
    const url = this.baseUrl.replace('/search', '') + `/${postId}`;
    return this.http.get<Post>(url);
  }
}
