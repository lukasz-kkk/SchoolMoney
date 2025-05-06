

namespace Domain.Repositories
{
    public interface IFundraiserRepository : IRepository<Fundraiser>
    {
        void Delete(int fundraiserId);
        bool Exists(string name);
        bool Exists(int id);
        Fundraiser? FirstOrDefault(Func<Fundraiser, bool> predicate = null);
        string GetAccount(int fundraiserId);
        int GetBalance(int fundraiserId);
        List<Fundraiser> GetByGroup(int groupId);
        List<Fundraiser> GetChildFundraisers(int childId);
        IEnumerable<Child> GetExcludedChilds(int fundraiserId);
        Group GetGroup(int fundraiserId);
        List<Fundraiser> GetList();
        List<Child> GetListOfMembers(int fundraiserId);
    }
}
