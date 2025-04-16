using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext appDbContext)
            : base(appDbContext, appDbContext.Users)
        {
        }

        public new User? Get(int id)
        {
            return _appDbContext.Users
                .Include(user => user.Account)
                .FirstOrDefault(user => user.Id == id);
        }

        public new List<User> GetList(Func<User, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Users
                    .Include(user => user.Account)
                    .ToList();
            return _appDbContext.Users
                .Include(user => user.Account)
                .Where(predicate)
                .ToList();
        }
    }
}
