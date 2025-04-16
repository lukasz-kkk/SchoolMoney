namespace Domain.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        new User Get(int id);
        new List<User> GetList(Func<User, bool> predicate = null);
    }
}
