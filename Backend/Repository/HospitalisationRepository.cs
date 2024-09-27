using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class HospitalisationRepository : IHospitalisationRepository
    {
        private readonly DataContext _context;

        public HospitalisationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Hospitalisation>> GetAllAsync()
        {
            return await _context.Hospitalisations.ToListAsync();
        }

        public async Task<Hospitalisation?> GetByIdAsync(int id)
        {
            return await _context.Hospitalisations.FindAsync(id);
        }

        public async Task<Hospitalisation> CreateAsync(Hospitalisation hospitalisation)
        {
            _context.Hospitalisations.Add(hospitalisation);
            await _context.SaveChangesAsync();
            return hospitalisation;
        }

        public async Task UpdateAsync(Hospitalisation hospitalisation)
        {
            _context.Entry(hospitalisation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var hospitalisation = await GetByIdAsync(id);
            if (hospitalisation == null)
                return false;
            _context.Hospitalisations.Remove(hospitalisation);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}