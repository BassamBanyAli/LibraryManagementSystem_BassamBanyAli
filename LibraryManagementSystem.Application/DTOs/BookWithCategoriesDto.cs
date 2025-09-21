using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Application.DTOs
{
    public class BookWithCategoriesDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Author { get; set; }
        public string? Isbn { get; set; }
        public DateTime? PublishedAt { get; set; }
        public string Categories { get; set; } = string.Empty; // comma separated
    }
}
