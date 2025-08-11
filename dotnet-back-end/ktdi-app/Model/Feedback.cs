using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class Feedback
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int FeedbackId { get; set; }

    public int UserId { get; set; }

    public int CollegeRating { get; set; }

    public int AccommodationRating { get; set; }

    public int FacilitiesRating { get; set; }

    public string Recommendation { get; set; }

    [ForeignKey("UserId")]
    public Authentication User { get; set; }
}