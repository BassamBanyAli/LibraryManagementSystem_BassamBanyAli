using LibraryManagementSystem.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Application.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooksAsync();
        Task<BookDto?> GetBookByIdAsync(int id);
        Task<BookDto> CreateBookAsync(CreateBookDto dto);
        Task<BookDto?> UpdateBookAsync(UpdateBookDto dto);
        Task<bool> DeleteBookAsync(int id);


        Task<IEnumerable<BookWithCategoriesDto>> GetAllBooksWithCategoriesAsync();
    }
}
