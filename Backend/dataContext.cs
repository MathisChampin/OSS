using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}
