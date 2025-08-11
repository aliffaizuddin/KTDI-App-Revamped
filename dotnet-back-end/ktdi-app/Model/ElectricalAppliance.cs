using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ElectricalAppliance
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ApplianceId { get; set; }

    public int UserId { get; set; }

    public string ApplianceList { get; set; }

    public decimal TotalAmount { get; set; }

    public string PaymentDetails { get; set; }

    [ForeignKey("UserId")]
    public Authentication User { get; set; }
}
