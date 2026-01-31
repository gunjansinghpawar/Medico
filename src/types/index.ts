export interface IComment {
  name: string;
  comment: string;
  createdAt: string;
}

export interface IAuthor {
  _id: string;
  name: string;
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  authorId: IAuthor | string; // Populated or ID
  tags: string[];
  thumbnail: string;
  likes: number;
  comments: IComment[];
  isDeleted: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface INews {
  _id: string;
  headline: string;
  body: string;
  source: string;
  category: string;
  publishedAt: string;
  createdBy: IAuthor | string;
  isDeleted: boolean;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
