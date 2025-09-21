export interface Book {
  id?: number;
  title: string;
  author?: string;
  isbn?: string;
  publishedAt?: string;
  categoryIds: number[];
}