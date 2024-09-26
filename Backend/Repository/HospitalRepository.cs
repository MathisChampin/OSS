using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class HospitalRepository : IHospitalRepository
    {
        private readonly DataContext _context;

        public HospitalRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Hospital>> GetAllAsync()
        {
            return await _context.Hospitals
                .Include(h => h.Users)
                .Include(h => h.Patients)
                .ToListAsync();
        }

        public async Task<Hospital?> GetByIdAsync(int id)
        {
            return await _context.Hospitals
                .Include(h => h.Users)
                .Include(h => h.Patients)
                .FirstOrDefaultAsync(h => h.Id == id);
        }

        public async Task<Hospital> CreateAsync(Hospital hospital)
        {
            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();
            return hospital;
        }
        public async Task UpdateAsync(Hospital hospital)
        {
            _context.Entry(hospital).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var hospital = await GetByIdAsync(id);
            if (hospital == null)
                return false;
            _context.Hospitals.Remove(hospital);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
