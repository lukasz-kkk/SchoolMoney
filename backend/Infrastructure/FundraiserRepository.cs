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
        public bool Exists(int id)
        {
            return _appDbContext.Fundraisers.Any(f => f.Id == id);
        }

        public string? GetAccount(int fundraiserId)
        {
            return _appDbContext.Fundraisers
                .Include(x => x.FinancialAccount)
                .Where(x => x.Id == fundraiserId)
                .Select(x => x.FinancialAccount.Number)
                .FirstOrDefault();
        }

        public int GetBalance(int fundraiserId)
        {
            return _appDbContext.Fundraisers
                .Include(x => x.FinancialAccount)
                .Where(x => x.Id == fundraiserId)
                .Select(x => x.FinancialAccount.Balance)
                .FirstOrDefault();
        }

        public IEnumerable<Child> GetExcludedChilds(int fundraiserId)
        {
            var fundraiser =  _appDbContext.Fundraisers
                .Include(x => x.ExcludedChildrens)
                .Where(x => x.Id == fundraiserId)
                .FirstOrDefault();

            return fundraiser!.ExcludedChildrens.Select(x => x.Child);
        }

        public Group? GetGroup(int fundraiserId)
        {
            return _appDbContext.Fundraisers
                .Include(x => x.Group)
                .Where(x => x.Id == fundraiserId)
                .Select(x => x.Group)
                .FirstOrDefault();
        }

        public List<Child> GetListOfMembers(int fundraiserId)
        {
            var fundraiser = _appDbContext.Fundraisers
                .Include(x => x.Group)
                .Include(x => x.ExcludedChildrens)
                .FirstOrDefault();


            return _appDbContext.Children.Where(x => x.Group == fundraiser!.Group
                && !fundraiser.ExcludedChildrens.Select(c => c.ChildId).Contains(x.Id))
                .ToList();
        }

        public List<Fundraiser> GetList()
        {
            return _appDbContext.Fundraisers
                .Include(x => x.FinancialAccount)
                .Include(x => x.Owner)
                .Include(x => x.Group)
                .ToList();
        }

        public List<Fundraiser> GetByGroup(int groupId)
        {
            return _appDbContext.Fundraisers
                .Include(x => x.FinancialAccount)
                .Include(x => x.Owner)
                .Include(x => x.Group)
                .Where(x => x.Group.Id == groupId)
                .ToList();
        }

        public void Delete(int fundraiserId)
        {
            var fundraiser = _appDbContext.Fundraisers
                .Include (x => x.FinancialAccount)
                .FirstOrDefault(x => x.Id == fundraiserId);

            _appDbContext.FinancialAccounts.Remove(fundraiser!.FinancialAccount);
            _appDbContext.Fundraisers.Remove(fundraiser);
        }

        public List<Fundraiser> GetChildFundraisers(int childId)
        {
            var child = _appDbContext.Children.Include(x => x.Group).First(x => x.Id == childId);

            return _appDbContext.Fundraisers
                .Include(x => x.FinancialAccount)
                .Where(x => x.Group == child.Group)
                .ToList();
        }
    }
}
