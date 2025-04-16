using Domain;
using Domain.Repositories;

namespace Infrastructure
{
    public class FinancialAccountRepository : Repository<FinancialAccount>, IFinancialAccountRepository
    {
        public FinancialAccountRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.FinancialAccounts)
        {
        }
    }
}
