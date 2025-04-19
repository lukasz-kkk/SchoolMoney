namespace Domain.Repositories
{
    public interface IGroupRepository : IRepository<Group>
    {
        new Group Get(int id);
        public Group? FirstOrDefault(Func<Group, bool> predicate = null);
        new List<Group> GetList(Func<Group, bool> predicate = null);
    }
}
