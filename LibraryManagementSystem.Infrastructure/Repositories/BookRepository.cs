using LibraryManagementSystem.Application.DTOs;
using LibraryManagementSystem.Application.Interfaces;
using LibraryManagementSystem.Domain.Entities;
using LibraryManagementSystem.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Book> AddAsync(Book entity)
        {
            if (entity.Categories != null && entity.Categories.Any())
            {
                var categoryIds = entity.Categories.Select(c => c.Id).ToList();
                var categories = await _context.Categories
                    .Where(c => categoryIds.Contains(c.Id))
                    .ToListAsync();

                entity.Categories = categories;
            }
            _context.Books.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Books.FindAsync(id);
            if (entity == null) return false;
            _context.Books.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            return await _context.Books
                                 .Include(b => b.Categories)
                                 .ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books
                                 .Include(b => b.Categories)
                                 .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Book> UpdateAsync(Book entity)
        {
            _context.Books.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<IEnumerable<BookWithCategoriesDto>> GetAllBooksWithCategoriesAsync()
        {
            var result = new List<BookWithCategoriesDto>();
            var connection = _context.Database.GetDbConnection();

            await using (connection)
            {
                await connection.OpenAsync();
                await using var command = connection.CreateCommand();
                command.CommandText = "GetAllBooksWithCategories";
                command.CommandType = System.Data.CommandType.StoredProcedure;

                await using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    result.Add(new BookWithCategoriesDto
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Title = reader.GetString(reader.GetOrdinal("Title")),
                        Author = reader.IsDBNull(reader.GetOrdinal("Author")) ? null : reader.GetString(reader.GetOrdinal("Author")),
                        Isbn = reader.IsDBNull(reader.GetOrdinal("ISBN")) ? null : reader.GetString(reader.GetOrdinal("ISBN")),
                        PublishedAt = reader.IsDBNull(reader.GetOrdinal("PublishedAt")) ? null : reader.GetDateTime(reader.GetOrdinal("PublishedAt")),
                        Categories = reader.IsDBNull(reader.GetOrdinal("Categories")) ? "" : reader.GetString(reader.GetOrdinal("Categories"))
                    });
                }
            }

            return result;
        }
    }
}
