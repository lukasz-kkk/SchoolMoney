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

        public List<Transaction> GetListByChild(int childId)
        {
            return _appDbContext.Transactions
                .Include(transaction => transaction.Sender)
                .Include(transaction => transaction.Child)
                .Where(x => x.Child.Id == childId)
                .ToList();
        }

        public int GetBalanceForChild(string account, Child child)
        {
            var onPlus = _appDbContext.Transactions.Where(x => x.Child == child && x.TargetAccountNumber == account).Sum(x => x.Amount);
            var onMinus = _appDbContext.Transactions.Where(x => x.Child == child && x.SourceAccountNumber == account).Sum(x => x.Amount);

            return onPlus - onMinus;
        }
    }
}
