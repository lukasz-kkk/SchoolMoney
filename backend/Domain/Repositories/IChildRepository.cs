namespace Domain.Repositories
{
    public interface IChildRepository : IRepository<Child>
    {
        new Child Get(int id);
        string GetAccount(int childId);
        List<Child> GetChildsInGroup(int groupId);
        new List<Child> GetList(Func<Child, bool> predicate = null);
    }
}
