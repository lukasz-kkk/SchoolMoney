namespace Domain.Repositories
{
    public interface IFinancialAccountRepository : IRepository<FinancialAccount>
    {
        FinancialAccount? FirstOrDefault(Func<FinancialAccount, bool> predicate = null);
    }
}
