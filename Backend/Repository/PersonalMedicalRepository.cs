using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class PMedicalRepository : IPMedicalRepository
    {
        private readonly DataContext _context;

        public PMedicalRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<PMedical>> GetAllAsync()
        {
            return await _context.PMedicals
                .ToListAsync();
        }
        public async Task<PMedical?> GetByIdAsync(int id)
        {
            return await _context.PMedicals
                .FirstOrDefaultAsync(h => h.Id == id);
        }
        public async Task<PMedical> CreateAsync(PMedical pmedical)
        {
            _context.PMedicals.Add(pmedical);
            await _context.SaveChangesAsync();
            return pmedical;
        }
        public async Task UpdateAsync(PMedical pmedical)
        {
            _context.Entry(pmedical).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var pmedical = await GetByIdAsync(id);
            if (pmedical == null)
                return false;
            _context.PMedicals.Remove(pmedical);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
