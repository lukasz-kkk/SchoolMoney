namespace Domain.Repositories
{
    public interface IFundraiserRepository : IRepository<Fundraiser>
    {
        bool Exists(string name);
        Fundraiser? FirstOrDefault(Func<Fundraiser, bool> predicate = null);
    }
}
