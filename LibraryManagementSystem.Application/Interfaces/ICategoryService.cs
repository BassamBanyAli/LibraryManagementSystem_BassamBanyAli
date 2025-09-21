using LibraryManagementSystem.Application.DTOs;
using LibraryManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Application.Interfaces
{
   
        public interface ICategoryService
        {
            Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
            Task<CategoryDto?> GetCategoryByIdAsync(int id);
            Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
            Task<CategoryDto?> UpdateCategoryAsync(UpdateCategoryDto dto);
            Task<bool> DeleteCategoryAsync(int id);
        }
    }

