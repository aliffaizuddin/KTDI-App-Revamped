// Data/myDbContext.cs
using Microsoft.EntityFrameworkCore;

public class myDbContext : DbContext
{
    public myDbContext(DbContextOptions<myDbContext> options) : base(options) { }

    // DbSet properties for each of your models
    public DbSet<Authentication> Authentication { get; set; }
    public DbSet<RoomRegistration> RoomRegistration { get; set; }
    public DbSet<RoomBooking> RoomBooking { get; set; }
    public DbSet<HallBooking> HallBooking { get; set; }
    public DbSet<ElectricalAppliance> ElectricalAppliance { get; set; }
    public DbSet<ReportDamage> ReportDamage { get; set; }
    public DbSet<Feedback> Feedback { get; set; }
}