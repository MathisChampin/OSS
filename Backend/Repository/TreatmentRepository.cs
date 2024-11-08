using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class TreatmentRepository : ITreatmentRepository
    {
        private readonly DataContext _context;

        public TreatmentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Treatment>> GetAllAsync()
        {
            return await _context.Treatments.ToListAsync();
        }
        public async Task<List<Treatment>> GetByNameAsync(string name)
        {
            return await _context.Treatments
                                 .Where(t => t.NameTreatment == name)
                                 .ToListAsync();
        }
        public async Task<Treatment?> GetByIdAsync(int id)
        {
            return await _context.Treatments.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<Treatment> CreateAsync(Treatment treatment)
        {
            _context.Treatments.Add(treatment);
            await _context.SaveChangesAsync();
            return treatment;
        }

        public async Task<Treatment> UpdateAsync(Treatment treatment)
        {
            _context.Treatments.Update(treatment);
            await _context.SaveChangesAsync();
            return treatment;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var treatment = await _context.Treatments.FindAsync(id);
            if (treatment == null)
                return false;
            _context.Treatments.Remove(treatment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
