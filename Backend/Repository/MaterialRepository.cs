using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend;
using Models;

namespace Repositories
{
    public class MaterialRepository : IMaterialRepository
    {
        private readonly DataContext _context;

        public MaterialRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Material>> GetAllAsync()
        {
            return await _context.Materials
                .Include(m => m.Device)
                .ToListAsync();
        }
        public async Task<Material?> GetByIdAsync(int id)
        {
            return await _context.Materials
                .Include(p => p.Device)
                .FirstOrDefaultAsync(h => h.Id == id);
        }

        public async Task<Material> CreateAsync(Material material)
        {
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
            return material;
        }
        public async Task UpdateAsync(Material material)
        {
            _context.Entry(material).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var material = await GetByIdAsync(id);
            if (material == null)
                return false;
            _context.Materials.Remove(material);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
