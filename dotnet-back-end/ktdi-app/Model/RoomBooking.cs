using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RoomBooking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int BookingId { get; set; }

    public int UserId { get; set; }

    public int RoomId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string ApprovalStatus { get; set; } = "Pending";

    public string PaymentDetails { get; set; }

    [ForeignKey("UserId")]
    public Authentication User { get; set; }

    [ForeignKey("RoomId")]
    public RoomRegistration Room { get; set; }
}