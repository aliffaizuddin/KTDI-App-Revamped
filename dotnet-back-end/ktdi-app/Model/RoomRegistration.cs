using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RoomRegistration
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RoomId { get; set; }

    public string RoomType { get; set; }

    public string Block { get; set; }

    public int Level { get; set; }

    public int Number { get; set; }

    public string Status { get; set; } = "available";
}