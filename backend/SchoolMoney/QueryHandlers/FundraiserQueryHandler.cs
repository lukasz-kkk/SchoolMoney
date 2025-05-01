using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using Infrastructure;
using Domain.Exceptions;

namespace SchoolMoney.QueryHandlers
{
    public class FundraiserQueryHandler : 
        IRequestHandler<GetAllFundraisersQuery, IEnumerable<FundraiserResponse>>,
        IRequestHandler<GetFundraiserChildsQuery, FundraiserChildsResponse>,
        IRequestHandler<GetFundraisersByGroupQuery, IEnumerable<FundraiserResponse>>
    {
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IChildRepository _childRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FundraiserQueryHandler(IFundraiserRepository fundraiserRepository, 
            IChildRepository childRepository,
            ITransactionRepository transactionRepository,
            IHttpContextAccessor httpContextAccessor)
        {
            _fundraiserRepository = fundraiserRepository;
            _childRepository = childRepository;
            _transactionRepository = transactionRepository;
            _httpContextAccessor = httpContextAccessor;
        }


        public Task<IEnumerable<FundraiserResponse>> Handle(GetAllFundraisersQuery request, CancellationToken cancellationToken)
        {
            var fundraisers = _fundraiserRepository.GetList();

            if (fundraisers == null)
            {
                return Task.FromResult(Enumerable.Empty<FundraiserResponse>());
            }

            var result = fundraisers.Select(x => new FundraiserResponse
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                AmountPerPerson = x.AmountPerPerson,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                FinancialAccountId = x.FinancialAccount.Id,
                OwnerId = x.Owner.Id,
                GroupId = x.Group.Id,
                IsBlocked = x.IsBlocked,
            });

            return Task.FromResult(result);
        }

        public Task<FundraiserChildsResponse> Handle(GetFundraiserChildsQuery request, CancellationToken cancellationToken)
        {
            var fundraiser = _fundraiserRepository.Get(request.Id);
            if(fundraiser == null)
            {
                throw new FundraiserNotFoundException(request.Id);
            }

            var group = _fundraiserRepository.GetGroup(request.Id);
            var childsInGroup = _childRepository.GetChildsInGroup(group.Id);
            var excludedChildrens = _fundraiserRepository.GetExcludedChilds(request.Id);

            var membersOfFundraiser = childsInGroup.Except(excludedChildrens);
            var account = _fundraiserRepository.GetAccount(request.Id);

            var paidChilds = new List<ChildResponse>();
            var unpaidChilds = new List<ChildResponse>();

            foreach (var child in membersOfFundraiser)
            {
                var balance = _transactionRepository.GetBalanceForChild(account, child);

                var childResponse = new ChildResponse
                {
                    Id = child.Id,
                    FirstName = child.FirstName,
                    LastName = child.LastName,
                    DateOfBirth = child.DateOfBirth,
                    ParentId = child.Parent.Id,
                    GroupId = child.Group?.Id,
                    IsAccepted = child.IsAccepted,
                    CreatedAt = child.CreatedAt
                };
                if (Math.Abs(balance - fundraiser.AmountPerPerson) < 100)
                {
                    paidChilds.Add(childResponse);
                }
                else
                {
                    unpaidChilds.Add(childResponse);
                }
            }

            return Task.FromResult(new FundraiserChildsResponse
            {
                PaidChilds = paidChilds,
                UnpaidChilds = unpaidChilds
            });
        }

        public Task<IEnumerable<FundraiserResponse>> Handle(GetFundraisersByGroupQuery request, CancellationToken cancellationToken)
        {
            var fundraisers = _fundraiserRepository.GetByGroup(request.Id);

            if (fundraisers == null)
            {
                return Task.FromResult(Enumerable.Empty<FundraiserResponse>());
            }

            var result = fundraisers.Select(x => new FundraiserResponse
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                AmountPerPerson = x.AmountPerPerson,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                FinancialAccountId = x.FinancialAccount.Id,
                OwnerId = x.Owner.Id,
                GroupId = x.Group.Id,
                IsBlocked = x.IsBlocked,
            });

            return Task.FromResult(result);
        }
    }
}
