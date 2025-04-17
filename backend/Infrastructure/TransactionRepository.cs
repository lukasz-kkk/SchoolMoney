using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class TransactionRepository : Repository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Transactions)
        {
        }

        public new Transaction? Get(int id)
        {
            return _appDbContext.Transactions
                .Include(transaction => transaction.Sender)
                .FirstOrDefault(transaction => transaction.Id == id);
        }

        public new List<Transaction> GetList(Func<Transaction, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Transactions
                    .Include(transaction => transaction.Sender)
                    .ToList();
            return _appDbContext.Transactions
                .Include(transaction => transaction.Sender)
                .Where(predicate)
                .ToList();
        }
    }
}
