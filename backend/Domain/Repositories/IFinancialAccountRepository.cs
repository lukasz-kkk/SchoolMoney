namespace Domain.Repositories
{
    public interface IFundraiserRepository : IRepository<Fundraiser>
    {
        Fundraiser? FirstOrDefault(Func<Fundraiser, bool> predicate = null);
    }
}
