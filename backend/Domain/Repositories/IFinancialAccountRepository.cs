
namespace Domain.Repositories
{
    public interface IFundraiserRepository : IRepository<Fundraiser>
    {
        void Delete(int fundraiserId);
        bool Exists(string name);
        Fundraiser? FirstOrDefault(Func<Fundraiser, bool> predicate = null);
        string GetAccount(int fundraiserId);
        List<Fundraiser> GetList();
        List<Child> GetListOfMembers(int fundraiserId);
    }
}
