using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class FinancialAccountRepository : Repository<FinancialAccount>, IFinancialAccountRepository
    {
        public FinancialAccountRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.FinancialAccounts)
        {
        }

        public FinancialAccount? FirstOrDefault(Func<FinancialAccount, bool> predicate = null)
        {
            return _appDbContext.FinancialAccounts
                .FirstOrDefault(predicate);
        }

    }
}
