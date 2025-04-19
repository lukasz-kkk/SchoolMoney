using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class GroupRepository : Repository<Group>, IGroupRepository
    {
        public GroupRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Groups)
        {
        }

        public new Group? Get(int id)
        {
            return _appDbContext.Groups
                .Include(group => group.Treasurer)
                .FirstOrDefault(group => group.Id == id);
        }

        public new List<Group> GetList(Func<Group, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Groups
                    .Include(group => group.Treasurer)
                    .ToList();
            return _appDbContext.Groups
                .Include(group => group.Treasurer)
                .Where(predicate)
                .ToList();
        }
    }
}
