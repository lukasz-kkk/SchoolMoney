using SchoolMoney.Queries;
using SchoolMoney.Response;
using MediatR;
using Domain.Repositories;
using SchoolMoney.Constants;
using SchoolMoney.Exceptions;
using SchoolMoney.Utils;
using Domain.Exceptions;
using Infrastructure;
using System.Globalization;
using System.Text.Json;
using System.Text;
using Infrastructure.Migrations;

namespace SchoolMoney.QueryHandlers
{
    public class GroupQueryHandler : IRequestHandler<GetAllGroupsQuery, IEnumerable<GroupResponse>>,
                                     IRequestHandler<GetGroupByLoggedUserQuery, IEnumerable<GroupResponse>>,
                                     IRequestHandler<GetGroupJoinCodeQuery, GroupJoinCodeResponse>,
                                     IRequestHandler<GetGroupRaport, string>
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IChildRepository _childRepository;
        private readonly IFundraiserRepository _fundraiserRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GroupQueryHandler(IGroupRepository groupRepository,
                                 IHttpContextAccessor httpContextAccessor,
                                 IChildRepository childRepository,
                                 IFundraiserRepository fundraiserRepository)
        {
            _fundraiserRepository = fundraiserRepository;
            _groupRepository = groupRepository;
            _httpContextAccessor = httpContextAccessor;
            _childRepository = childRepository;
        }

        public Task<IEnumerable<GroupResponse>> Handle(GetAllGroupsQuery request, CancellationToken cancellationToken)
        {
            var groups = _groupRepository.GetList();

            if (groups == null)
            {
                return Task.FromResult(Enumerable.Empty<GroupResponse>());
            }

            var result = groups.Select(x => new GroupResponse
            {
                Id = x.Id,
                Name = x.Name,
                TreasurerId = x.Treasurer.Id,
                TreasurerFirstName = x.Treasurer.FirstName,
                TreasurerLastName = x.Treasurer.LastName,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }

        public Task<IEnumerable<GroupResponse>> Handle(GetGroupByLoggedUserQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var children = _childRepository.GetList(x => x.Parent.Id == loggedUserId);

            var groups = _groupRepository.GetList(g =>
                g.Treasurer.Id == loggedUserId ||
                children.Any(c => c.IsAccepted && c.Group.Id == g.Id)
            );

            if (groups == null || !groups.Any())
            {
                return Task.FromResult(Enumerable.Empty<GroupResponse>());
            }

            var result = groups.Select(x => new GroupResponse
            {
                Id = x.Id,
                Name = x.Name,
                TreasurerId = x.Treasurer.Id,
                TreasurerFirstName = x.Treasurer.FirstName,
                TreasurerLastName = x.Treasurer.LastName,
                CreatedAt = x.CreatedAt
            });

            return Task.FromResult(result);
        }

        public Task<GroupJoinCodeResponse> Handle(GetGroupJoinCodeQuery request, CancellationToken cancellationToken)
        {
            var loggedUserId = JwtHelper.GetUserIdFromCookies(_httpContextAccessor)
                ?? throw new InvalidCookieException(Cookies.UserId);

            var group = _groupRepository.Get(request.GroupId)
                    ?? throw new GroupNotFoundException(request.GroupId);

            if (group.Treasurer.Id != loggedUserId)
                throw new UserIsNotTreasurerException(loggedUserId);

            var result = new GroupJoinCodeResponse
            {
                JoinCode = group.JoinCode
            };

            return Task.FromResult(result);
        }

        public async Task<string> Handle(GetGroupRaport request, CancellationToken cancellationToken)
        {
            var fundraisers = _fundraiserRepository.GetByGroup(request.GroupId)
                ?? throw new FundraiserNotFoundException(request.GroupId);

            var fullCsv = new StringBuilder();

            foreach (var fundraiser in fundraisers)
            {
                var account = _fundraiserRepository.GetAccount(fundraiser.Id);
                var balance = _fundraiserRepository.GetBalance(fundraiser.Id);
                var csvPart = CsvHelper.GenerateFundraiserCsvReport(fundraiser, account, balance);

                fullCsv.AppendLine(csvPart.ToString());
            }

            return fullCsv.ToString();
        }
    }
}
