using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Application.DTOs
{
    public class CreateBookDto
    {

        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot be longer than 200 characters")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "Author is required")]
        [StringLength(200, ErrorMessage = "Author cannot be longer than 200 characters")]
        public string? Author { get; set; }

        [Required(ErrorMessage = "ISBN is required")]
        [StringLength(20, ErrorMessage = "ISBN cannot be longer than 20 characters")]
        public string? Isbn { get; set; }

        [Required(ErrorMessage = "Published date is required")]
        public DateTime? PublishedAt { get; set; }

        [Required(ErrorMessage = "At least one category is required")]
        [MinLength(1, ErrorMessage = "You must select at least one category")]
        public List<int> CategoryIds { get; set; } = new();
    }
}
