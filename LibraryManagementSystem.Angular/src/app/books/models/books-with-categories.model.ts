export interface BookWithCategories {
  id: number;
  title: string;
  author?: string;
  isbn?: string;
  publishedAt?: string;
  categories: string; 
}
