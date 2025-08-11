using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class HallBooking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int BookingId { get; set; }

    public int UserId { get; set; }

    public DateTime BookingDate { get; set; }

    public TimeSpan BookingTime { get; set; }

    public string ApprovalStatus { get; set; } = "Pending";

    public string PaymentDetails { get; set; }

    [ForeignKey("UserId")]
    public Authentication User { get; set; }
}
