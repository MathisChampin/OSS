using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class PNoMedicalRepository : IPNoMedicalRepository
    {
        private readonly DataContext _context;

        public PNoMedicalRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<PNoMedical>> GetAllAsync()
        {
            return await _context.PNoMedicals
                .ToListAsync();
        }
        public async Task<PNoMedical?> GetByIdAsync(int id)
        {
            return await _context.PNoMedicals
                .FirstOrDefaultAsync(h => h.Id == id);
        }
    }
}
