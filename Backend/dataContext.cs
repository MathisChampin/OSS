using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Hospitalisation> Hospitalisations { get; set; }
        public DbSet<Patient> Patients {get; set; }
        public DbSet<PMedical> PMedicals {get; set; }
        public DbSet<PNoMedical> PNoMedicals {get; set; }
        public DbSet<Material> Materials {get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>()
                .HasOne(p => p.Hospitalisation)
                .WithOne()
                .HasForeignKey<Hospitalisation>(h => h.PatientId);

            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.Patients)
                .WithOne()
                .HasForeignKey(p => p.HospitalId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.Users)
                .WithOne()
                .HasForeignKey(u => u.HospitalId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.PMedicals)
                .WithOne()
                .HasForeignKey(pm => pm.HospitalId)
                .OnDelete(DeleteBehavior.Cascade);
    
            modelBuilder.Entity<Hospital>()
                .HasMany(h => h.Materials)
                .WithOne()
                .HasForeignKey(m => m.HospitalId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
