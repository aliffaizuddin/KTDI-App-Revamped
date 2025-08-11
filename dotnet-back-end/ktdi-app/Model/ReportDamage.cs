using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ReportDamage
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ReportId { get; set; }

    public int UserId { get; set; }

    public string ImagePath { get; set; }

    public string TypeOfDamage { get; set; }

    public string Description { get; set; }

    public string Status { get; set; } = "Draft";

    [ForeignKey("UserId")]
    public Authentication User { get; set; }
}