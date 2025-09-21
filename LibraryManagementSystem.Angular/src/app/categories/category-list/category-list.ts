import { Component,OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';
import { MyService } from '../services/my-service';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit{
categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private categoryService: MyService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  openForm() {
    this.router.navigate(['/categories/form']);
  }

  editCategory(category: Category) {
    this.router.navigate(['/categories/form', category.id]);
  }

deleteCategory(id: number) {
  this.categoryService.deleteCategory(id).subscribe({
    next: () => console.log(`Deleted category ${id}`),
    error: (err) => console.error('Delete failed', err)
  });
}

}

