using System;
using System.Collections.Generic;

namespace LibraryManagementSystem.Domain.Entities;

public partial class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Author { get; set; }

    public string? Isbn { get; set; }

    public DateTime? PublishedAt { get; set; }

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
