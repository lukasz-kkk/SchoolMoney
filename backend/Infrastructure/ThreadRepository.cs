using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure
{
    public class ThreadRepository : Repository<Domain.Thread>, IThreadRepository
    {
        public ThreadRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Threads)
        {}

        public new Domain.Thread? Get(int id)
        {
            return _appDbContext.Threads
                .Include(thread => thread.Treasurer)
                .Include(thread => thread.Parent)
                .Include(thread => thread.Messages)
                .FirstOrDefault(group => group.Id == id);
        }
        public new List<Domain.Thread> GetList(Func<Domain.Thread, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Threads
                    .Include(thread => thread.Treasurer)
                    .Include(thread => thread.Parent)
                    .Include(thread => thread.Messages)
                    .ToList();
            return _appDbContext.Threads
                .Include(thread => thread.Treasurer)
                .Include(thread => thread.Parent)
                .Include(thread => thread.Messages)
                .Where(predicate)
                .ToList();
        }
    }
}
