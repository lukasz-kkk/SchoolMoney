
namespace Domain.Repositories
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        int GetBalanceForChild(string account, Child child);
        List<Transaction> GetListByChild(int childId);
    }
}
