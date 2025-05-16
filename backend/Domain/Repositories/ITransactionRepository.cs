
namespace Domain.Repositories
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        string GetAccount(int childId, string fundraiserAccountNumber);
        int GetBalanceForChild(string account, Child child);
        List<Transaction> GetListByChild(int childId);
    }
}
