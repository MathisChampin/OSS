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
        public async Task<PNoMedical> CreateAsync(PNoMedical pNoMedical)
        {
            _context.PNoMedicals.Add(pNoMedical);
            await _context.SaveChangesAsync();
            return pNoMedical;
        }
        public async Task UpdateAsync(PNoMedical noMedical)
        {
            _context.Entry(noMedical).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var noMedical = await GetByIdAsync(id);
            if (noMedical == null)
                return false;
            _context.PNoMedicals.Remove(noMedical);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
