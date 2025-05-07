using Domain;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Child> Children { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<FinancialAccount> FinancialAccounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Fundraiser> Fundraisers { get; set; }
        public DbSet<File> Files { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<FundraiserChild>()
                .HasKey(fc => new { fc.FundraiserId, fc.ChildId });
        }
    }
}
