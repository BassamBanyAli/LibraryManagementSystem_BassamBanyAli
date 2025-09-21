using AutoMapper;
using LibraryManagementSystem.Application.DTOs;
using LibraryManagementSystem.Application.Interfaces;
using LibraryManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _repository;
        private readonly ICategoryRepository _categoryRepository;

        private readonly IMapper _mapper;

        public BookService(IBookRepository repository, IMapper mapper, ICategoryRepository categoryRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
        {
            var entities = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<BookDto>>(entities);
        }

        public async Task<BookDto?> GetBookByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return null;
            //return _mapper.Map<BookDto>(entity);
            return _mapper.Map<BookDto>(entity);
        }

        public async Task<BookDto> CreateBookAsync(CreateBookDto dto)
        {

            var existingCategoryIds = await _categoryRepository
            .GetAllIdsAsync(dto.CategoryIds);

            var invalidIds = dto.CategoryIds.Except(existingCategoryIds).ToList();
            if (invalidIds.Any())
            {
                throw new ArgumentException($"Invalid Category IDs: {string.Join(", ", invalidIds)}");
            }

            var entity = _mapper.Map<Book>(dto);
            entity.Categories = existingCategoryIds
           .Select(id => new Category { Id = id })
           .ToList();
            var created = await _repository.AddAsync(entity);
            return _mapper.Map<BookDto>(created);
        }

        public async Task<BookDto?> UpdateBookAsync(UpdateBookDto dto)
        {

            var existingCategoryIds = await _categoryRepository
             .GetAllIdsAsync(dto.CategoryIds);

            var invalidIds = dto.CategoryIds.Except(existingCategoryIds).ToList();
            if (invalidIds.Any())
            {
                throw new ArgumentException($"Invalid Category IDs: {string.Join(", ", invalidIds)}");
            }

            var existing = await _repository.GetByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Title = dto.Title;
            existing.Author = dto.Author;
            existing.Isbn = dto.Isbn;
            existing.PublishedAt = dto.PublishedAt;

            // Correct way to update categories
            existing.Categories.Clear();
            var categories = await _categoryRepository.GetByIdsAsync(dto.CategoryIds);
            foreach (var cat in categories)
            {
                existing.Categories.Add(cat);
            }

            var updated = await _repository.UpdateAsync(existing);
            return _mapper.Map<BookDto>(updated);

        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }



        public async Task<IEnumerable<BookWithCategoriesDto>> GetAllBooksWithCategoriesAsync()
        {
            return await _repository.GetAllBooksWithCategoriesAsync();
        }
    }
}