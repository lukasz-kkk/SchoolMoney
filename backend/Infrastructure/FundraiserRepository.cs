using Domain;
using Domain.Repositories;

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
    }
}
