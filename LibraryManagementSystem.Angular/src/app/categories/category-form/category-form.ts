import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from '../services/my-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm implements OnInit {
  categoryForm!: FormGroup;
  categoryId?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: MyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 ngOnInit(): void {
    this.categoryId = +this.route.snapshot.params['id'];
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],

    });

    if (this.categoryId) {
      this.categoryService.getCategories().subscribe(categories => {
        const category = categories.find(c => c.id === this.categoryId);
        if (category) this.categoryForm.patchValue(category);
      });
    }
  }
cancel() {
  this.router.navigate(['/categories']);
}

 saveCategory() {
  if (this.categoryForm.invalid) return;

  const category: Category = { id: this.categoryId || 0, ...this.categoryForm.value };

  if (this.categoryId) {
    // subscribe to the HTTP request
    this.categoryService.updateCategory(category).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: (err) => console.error('Update failed', err)
    });
  } else {
    this.categoryService.addCategory(category).subscribe({
      next: () => this.router.navigate(['/categories']),
      error: (err) => console.error('Add failed', err)
    });
  }
}

}
