using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using Infrastructure;

namespace SchoolMoney.QueryHandlers
{
    public class FundraiserQueryHandler : IRequestHandler<GetAllFundraisersQuery, IEnumerable<FundraiserResponse>>
    {
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FundraiserQueryHandler(IFundraiserRepository fundraiserRepository, IHttpContextAccessor httpContextAccessor)
        {
            _fundraiserRepository = fundraiserRepository;
            _httpContextAccessor = httpContextAccessor;
        }


        public Task<IEnumerable<FundraiserResponse>> Handle(GetAllFundraisersQuery request, CancellationToken cancellationToken)
        {
            var groups = _fundraiserRepository.GetList();

            if (groups == null)
            {
                return Task.FromResult(Enumerable.Empty<FundraiserResponse>());
            }

            var result = groups.Select(x => new FundraiserResponse
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
