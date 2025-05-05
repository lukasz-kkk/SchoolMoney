using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class FileRepository : Repository<File>, IFileRepository
    {
        public FileRepository(AppDbContext appDbContext)
            : base(appDbContext, appDbContext.Files)
        {
        }
    }
}
