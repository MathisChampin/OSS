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
        public async Task<PMedical> CreateAsync(PMedical pMedical)
        {
            _context.PMedicals.Add(pMedical);
            await _context.SaveChangesAsync();
            return pMedical;
        }
        public async Task UpdateAsync(PMedical pMedical)
        {
            _context.Entry(pMedical).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var pMedical = await GetByIdAsync(id);
            if (pMedical == null)
                return false;
            _context.PMedicals.Remove(pMedical);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
