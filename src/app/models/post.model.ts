export interface Reaction {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

export interface PostsSearchResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostsSearchParams {
  limit: number;
  skip: number;
  query?: string;
}
