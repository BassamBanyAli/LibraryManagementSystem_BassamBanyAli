import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksWithCategories } from './books-with-categories';

describe('BooksWithCategories', () => {
  let component: BooksWithCategories;
  let fixture: ComponentFixture<BooksWithCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksWithCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksWithCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
