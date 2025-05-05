using Domain;
using Domain.Repositories;
using Infrastructure.Migrations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class FileRepository : Repository<File>, IFileRepository
    {
        public FileRepository(AppDbContext appDbContext)
            : base(appDbContext, appDbContext.Files)
        {
        }

        public File? FirstOrDefault(Func<File, bool> predicate = null)
        {
            return _appDbContext.Files
                .FirstOrDefault(predicate);
        }

        public new List<File> GetList(Func<File, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Files.ToList();
            return _appDbContext.Files
                .Include(file => file.Fundraiser)
                .Where(predicate)
                .ToList();
        }
    }
}
