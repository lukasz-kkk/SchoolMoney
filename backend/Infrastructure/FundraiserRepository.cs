using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class FundraiserRepository : Repository<Fundraiser>, IFundraiserRepository
    {
        public FundraiserRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Fundraisers)
        {
        }

        public Fundraiser? FirstOrDefault(Func<Fundraiser, bool> predicate = null)
        {
            return _appDbContext.Fundraisers.FirstOrDefault(predicate);
        }

        public bool Exists(string name)
        {
            return _appDbContext.Fundraisers.Any(f => f.Name == name);
        }

        public string? GetAccount(int fundraiserId)
        {
            return _appDbContext.Fundraisers
                .Include(x => x.FinancialAccount)
                .Where(x => x.Id == fundraiserId)
                .Select(x => x.FinancialAccount.Number)
                .FirstOrDefault();
        }
    }
}
